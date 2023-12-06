"""Utility functions for GCS realted things."""
import tempfile
from google.cloud import storage

KEY = "/nas/longleaf/home/aryonna/Dreamscape/comp-523-dreamscape/dreamdiffusion/keys/poetic-emblem-404623-f8d179cff968.json"
PATIENT_EEG_SIGNALS_BUCKET = "patient-eeg-signals"

def get_local_file_path(gcs_path: str) -> str:
    # Split the GCS path into parts
    parts = gcs_path.split('/')
    # Extract the bucket name and object name
    bucket_name = parts[2]
    object_name = "/".join(parts[3:])
    local_temp_file = tempfile.NamedTemporaryFile(delete=False)
    local_temp_file_path = local_temp_file.name
    client = storage.Client.from_service_account_json(KEY)
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(object_name)
    blob.download_to_filename(local_temp_file_path)
    return local_temp_file_path

def delete_local_path(local_path: str) -> None:
    os.remove(local_path)