import torch
import numpy as np

# Load the data from the .pth file
checkpoint = torch.load('datasets/eeg_5_95_std.pth')

eeg_data = checkpoint['dataset']

i = 0

# Assuming mne_data is a list of tensors
for sample in eeg_data:
    # Convert the tensor to a NumPy array
    eeg_tensor = sample['eeg']
    eeg_array = eeg_tensor.numpy()

    np.save(f'datasets/mne_data/{i}.npy', eeg_array)
    i += 1
