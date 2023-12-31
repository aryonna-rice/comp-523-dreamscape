from dataset import *
import os, sys
import numpy as np
import torch
from einops import rearrange
from PIL import Image
import torchvision.transforms as transforms
from config import *
import wandb
import datetime
from dc_ldm.ldm_for_eeg import eLDM
import tempfile
from google.cloud import storage

PATIENT_IMAGE_BUCKET = "patient-eeg-images"
MODEL_PATH = "gs://eeg-checkpoint-files/pretrains-generation-checkpoint.pth"
ROOT = "../dreamdiffusion/"

def to_image(img):
    if img.shape[-1] != 3:
        img = rearrange(img, 'c h w -> h w c')
    img = 255. * img
    return Image.fromarray(img.astype(np.uint8))

def channel_last(img):
    if img.shape[-1] == 3:
        return img
    return rearrange(img, 'c h w -> h w c')

def normalize(img):
    if img.shape[-1] == 3:
        img = rearrange(img, 'h w c -> c h w')
    img = torch.tensor(img)
    img = img * 2.0 - 1.0 # to -1 ~ 1
    return img

# Initialize WandB (Weights and Biases) for logging and visualization
def wandb_init(config):
    wandb.init( project="dreamdiffusion",
                group='eval',
                anonymous="allow",
                config=config,
                reinit=True)

class random_crop:
    def __init__(self, size, p):
        self.size = size
        self.p = p
    def __call__(self, img):
        if torch.rand(1) < self.p:
            return transforms.RandomCrop(size=(self.size, self.size))(img)
        return img
    
def get_local_file_path(gcs_path: str) -> str:
    _, bucket_name, object_name = gcs_path.split('/', 2)
    local_temp_file = tempfile.NamedTemporaryFile(delete=False)
    local_temp_file_path = local_temp_file.name
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(object_name)
    blob.download_to_filename(local_temp_file_path)
    return local_temp_file_path

def delete_local_path(local_path: str) -> None:
    os.remove(local_path)

 
def generate_image(patient_id: int, eeg_signals_path: str):
    """eeg_signals_path is really a name for an object."""
    # Define the GCS path based on patient_id and datetime
    datetime_str = datetime.datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
    gcs_output_path = f"{PATIENT_IMAGE_BUCKET}/{patient_id}/{datetime_str}/"

    # Load pre-trained model checkpoint
    local_model_path = get_local_file_path(MODEL_PATH)
    sd = torch.load(local_model_path, map_location='cpu')
    config = sd['config']

    # update paths
    config.root_path = ROOT
    local_eeg_signals_path = get_local_file_path(eeg_signals_path)
    config.eeg_signals_path = local_eeg_signals_path
    local_pretrain_mbm_path = get_local_file_path("gs://eeg-checkpoint-files/results-eeg_pretrain-28-11-2023-21-07-25-checkpoints-checkpoint.pth")
    config.pretrain_mbm_path = local_pretrain_mbm_path
    config.pretrain_gm_path = 'pretrains/'

    print("Updated config:")
    print(config.__dict__)
    
    print(f"Generated output path: {gcs_output_path}")
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    img_transform_test = transforms.Compose([
        normalize, transforms.Resize((512, 512)), 
        channel_last
    ])
    
    dataset_test = EEGDataset(config.eeg_signals_path, img_transform_test, subject=4)
    num_voxels = dataset_test.dataset.data_len
    print(len(dataset_test))

    # prepare pretrained mae 
    pretrain_mbm_metafile = torch.load(config.pretrain_mbm_path, map_location='cpu')

# Initialize Generative Model
    generative_model = eLDM(pretrain_mbm_metafile, num_voxels,
                            device=device, pretrain_root=config.pretrain_gm_path,
                            ddim_steps=config.ddim_steps, global_pool=config.global_pool,
                            use_time_cond=config.use_time_cond)
    generative_model.model.load_state_dict(sd['model_state_dict'], strict=False)
    print('Loaded generative model successfully')
    state = sd['state']

    # Generate Samples using new, unseen EEG data
    grid, samples = generative_model.generate(dataset_test, config.num_samples,
                                            config.ddim_steps, config.HW, limit=None, state=state,
                                            output_path=gcs_output_path)

        # Iterate through each sample and save it individually
    for i, sample in enumerate(samples):
        # Convert the sample to an image
        img = Image.fromarray((255. * sample.cpu().numpy()).astype(np.uint8))

        # Create a temporary local file to save the image
        local_image_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
        local_image_file_path = local_image_file.name

        # Save the individual image
        img.save(local_image_file_path)

        # Upload the local image file to GCS
        client = storage.Client()
        blob_name = f"sample_{i}.png"  # Adjust the blob name as needed
        blob = client.bucket(PATIENT_IMAGE_BUCKET).blob(f"{patient_id}/{datetime_str}/{blob_name}")
        blob.upload_from_filename(local_image_file_path)
        # Delete the local image file
        delete_local_path(local_image_file_path)

    delete_local_path(local_image_file_path)
    delete_local_path(local_eeg_signals_path)
    delete_local_path(local_pretrain_mbm_path)
    delete_local_path(local_model_path)
