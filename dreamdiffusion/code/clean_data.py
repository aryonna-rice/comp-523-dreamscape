import pandas as pd
import numpy as np
import torch
from torch.utils.data import Dataset, DataLoader
from sklearn.preprocessing import StandardScaler
from google.cloud import storage
import datetime
import os
import tempfile
import io
from scipy.signal import butter, filtfilt
import argparse


PATIENT_CSV_DATA_BUCKET = "patient-csv-data"
PATIENT_EEG_SIGNALS_BUCKET = "patient-eeg-signals"
ROOT_PATH = '../dreamdiffusion/'
SAMPLING_RATE = 256

KEY = "/nas/longleaf/home/aryonna/Dreamscape/comp-523-dreamscape/dreamdiffusion/keys/poetic-emblem-404623-f8d179cff968.json"

def butter_bandpass(lowcut, highcut, fs, order=4):
    nyquist = 0.5 * fs
    low = lowcut / nyquist
    high = highcut / nyquist
    b, a = butter(order, [low, high], btype='band')
    return b, a

def butter_bandpass_filter(data, lowcut, highcut, fs, order=4):
    b, a = butter_bandpass(lowcut, highcut, fs, order=order)
    y = filtfilt(b, a, data, padtype='constant', padlen=27)  # Adjusted padlen to avoid ValueError
    return y
    # b, a = butter_bandpass(lowcut, highcut, fs, order=order)
    
    # # Check if the input vector is shorter than the pad length
    # padlen = max(len(a), len(b)) - 1
    # if len(data) <= padlen:
    #     return data
    
    # y = filtfilt(b, a, data, padlen=padlen)
    # return y


def drop_irrelevants(eeg_data: pd.DataFrame) -> pd.DataFrame:
    """Drop rows with NaN values in EEG columns and columns that are not EEG related."""
    relevant_eeg_data = eeg_data.dropna(subset=['Delta_TP9', 'Delta_AF7', 'Delta_AF8', 'Delta_TP10',
                                'Theta_TP9', 'Theta_AF7', 'Theta_AF8', 'Theta_TP10',
                                'Alpha_TP9', 'Alpha_AF7', 'Alpha_AF8', 'Alpha_TP10',
                                'Beta_TP9', 'Beta_AF7', 'Beta_AF8', 'Beta_TP10',
                                'Gamma_TP9', 'Gamma_AF7', 'Gamma_AF8', 'Gamma_TP10'])

    # Drop columns that are not relevant to EEG data
    relevant_eeg_data = relevant_eeg_data[['Delta_TP9', 'Delta_AF7', 'Delta_AF8', 'Delta_TP10',
                            'Theta_TP9', 'Theta_AF7', 'Theta_AF8', 'Theta_TP10',
                            'Alpha_TP9', 'Alpha_AF7', 'Alpha_AF8', 'Alpha_TP10',
                            'Beta_TP9', 'Beta_AF7', 'Beta_AF8', 'Beta_TP10',
                            'Gamma_TP9', 'Gamma_AF7', 'Gamma_AF8', 'Gamma_TP10']]
    
    relevant_eeg_data = relevant_eeg_data.reset_index(drop=True)
    return relevant_eeg_data


def fix_up(eeg_signals: np.ndarray) -> np.ndarray:
    # No need to discard initial samples

    # Cut the signal to a common length of 128 samples
    common_length = int(0.5 * SAMPLING_RATE)  # Assuming 0.5 seconds
    eeg_signals = eeg_signals[:common_length, :]

    # Determine the number of channels from the input data shape
    num_channels = eeg_signals.shape[1]
    num_samples = eeg_signals.shape[0]
    
    # Assuming you have 4 channels, create a 4x128 matrix
    eeg_matrix = np.zeros((num_channels, num_samples))

    # Copy the data to the new matrix
    eeg_matrix[:num_channels, :] = eeg_signals.T

    # Filtering in three frequency ranges
    fs = SAMPLING_RATE
    eeg_matrix_filtered = np.zeros_like(eeg_matrix)

    # Frequency ranges: 14-70Hz, 5-95Hz, and 55-95Hz
    frequency_ranges = [(14, 70), (5, 95), (55, 95)]

    for i in range(eeg_matrix.shape[0]):
        for lowcut, highcut in frequency_ranges:
            eeg_matrix_filtered[i, :] = butter_bandpass_filter(
                eeg_matrix[i, :], lowcut, highcut, fs
            )
    print("Shape of eeg_matrix_filtered:", eeg_matrix_filtered.shape)
    return eeg_matrix_filtered



def save_tensor_to_gcs(eeg_tensors, remote_file_path: str) -> str:
    # Save the tensor to a temporary file locally
    local_temp_file = tempfile.NamedTemporaryFile(delete=False)
    torch.save(eeg_tensors, local_temp_file.name)
    storage_client = storage.Client.from_service_account_json(KEY)
    bucket = storage_client.get_bucket(PATIENT_EEG_SIGNALS_BUCKET)
    blob = bucket.blob(remote_file_path)
    blob.upload_from_file(local_temp_file)
    os.remove(local_temp_file.name)
    gcs_path = f"gs://{PATIENT_EEG_SIGNALS_BUCKET}/{remote_file_path}"
    return gcs_path


def read_csv_from_gcs(file_path) -> str:
    storage_client = storage.Client.from_service_account_json(KEY)
    bucket = storage_client.get_bucket(PATIENT_CSV_DATA_BUCKET)
    blob = bucket.blob(file_path)
    # Download the contents of the blob (file)
    content = blob.download_as_text()
    return content

def get_remote_file_path(patient_id: int) -> str:
    timestamp = datetime.datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
    output_path = os.path.join(str(patient_id), f"{timestamp}.pth")
    return output_path


def get_args_parser():
    parser = argparse.ArgumentParser('Double Conditioning LDM Finetuning', add_help=False)
    # project parameters
    parser.add_argument('--root', type=str, default='../dreamdiffusion/')
    parser.add_argument('--csv_file_path', type=str)
    parser.add_argument('--patient_id', type=int)

    return parser


if __name__ == '__main__':
    args = get_args_parser()
    args = args.parse_args()
    root = args.root
    csv_file_path = args.csv_file_path
    patient_id = args.patient_id
    
    content = read_csv_from_gcs(file_path=csv_file_path)
    eeg_data = pd.read_csv(io.StringIO(content))
    relevant_eeg_data = drop_irrelevants(eeg_data=eeg_data)
    eeg_signals = relevant_eeg_data[relevant_eeg_data.columns].values
    eeg_signals = fix_up(eeg_signals=eeg_signals)
    print(eeg_signals.shape)
    eeg_tensors = torch.tensor(eeg_signals, dtype=torch.float32)
    print("EEG tensors shape:", eeg_tensors.shape)
    print("Sample of EEG tensors:")
    print(eeg_tensors[0])  # Adjust as needed
    remote_file_path = get_remote_file_path(patient_id=patient_id)
    save_tensor_to_gcs(eeg_tensors=eeg_tensors, remote_file_path=remote_file_path)
    
    
# def clean_data(csv_file_path: str, patient_id: int) -> str:
#     """Preforms various transformations to fix data for model."""
#     content = read_csv_from_gcs(file_path=csv_file_path)
#     eeg_data = pd.read_csv(io.StringIO(content))
#     relevant_eeg_data = drop_irrelevants(eeg_data=eeg_data)
#     eeg_signals = relevant_eeg_data[relevant_eeg_data.columns].values
#     eeg_signals = fix_up(eeg_signals=eeg_signals)
#     eeg_tensors = torch.tensor(eeg_signals, dtype=torch.float32)
#     remote_file_path = get_remote_file_path(patient_id=patient_id)
#     return save_tensor_to_gcs(eeg_tensors=eeg_tensors, remote_file_path=remote_file_path)
    
#command: python3 code/clean_data.py --csv_file_path "0/muse_eeg_export.csv" --patient_id 0