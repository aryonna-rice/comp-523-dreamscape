import torch
import numpy as np

# Load the data from the .pth file
data = torch.load('datasets/eeg_5_95_std.pth')

# Iterate through the tensors and convert them to NumPy arrays
for i, tensor in enumerate(data):
    # Convert the tensor to a NumPy array
    ndarray = tensor.numpy()
    # Save the NumPy array as a file, e.g., i.npy
    np.save(f'datasets/mne_data/{i}.npy', ndarray)
