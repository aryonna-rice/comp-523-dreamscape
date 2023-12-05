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

PATIENT_CSV_DATA_BUCKET = "patient-csv-data"
PATIENT_EEG_SIGNALS_BUCKET = "patient-eeg-signals"
ROOT_PATH = '../dreamdiffusion/'
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../dreamdiffusion/keys/poetic-emblem-404623-5bc4d593eab4.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../dreamdiffusion/keys/poetic-emblem-404623-0ab6687fe0ea.json"

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


def standardize_eeg_data(eeg_signals: np.ndarray) -> np.ndarray:
    scaler = StandardScaler()
    eeg_signals = scaler.fit_transform(eeg_signals)
    return eeg_signals

def save_tensor_to_gcs(eeg_tensors, remote_file_path: str) -> str:
    # Save the tensor to a temporary file locally
    local_temp_file = tempfile.NamedTemporaryFile(delete=False)
    torch.save(eeg_tensors, local_temp_file.name)
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(PATIENT_EEG_SIGNALS_BUCKET)
    blob = bucket.blob(remote_file_path)
    blob.upload_from_file(local_temp_file.name)
    os.remove(local_temp_file.name)
    gcs_path = f"gs://{PATIENT_EEG_SIGNALS_BUCKET}/{remote_file_path}"
    return gcs_path


def read_csv_from_gcs(file_path) -> str:
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(PATIENT_CSV_DATA_BUCKET)
    blob = bucket.blob(file_path)
    # Download the contents of the blob (file)
    content = blob.download_as_text()
    return content

def get_remote_file_path(patient_id: int) -> str:
    timestamp = datetime.datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
    output_path = os.path.join("datasets", "csv_data", str(patient_id), f"{timestamp}.pth")
    return output_path

def clean_data(csv_file_path: str, patient_id: int) -> str:
    """Preforms various transformations to fix data for model."""
    content = read_csv_from_gcs(file_path=csv_file_path)
    eeg_data = pd.read_csv(io.StringIO(content))
    relevant_eeg_data = drop_irrelevants(eeg_data=eeg_data)
    eeg_signals = relevant_eeg_data[relevant_eeg_data.columns].values
    eeg_signals = standardize_eeg_data(eeg_signals=eeg_signals)
    eeg_tensors = torch.tensor(eeg_signals, dtype=torch.float32)
    remote_file_path = get_remote_file_path(patient_id=patient_id)
    return save_tensor_to_gcs(eeg_tensors=eeg_tensors, remote_file_path=remote_file_path)

    
