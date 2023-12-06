"""Testing strictly clean_data."""
from dreamdiffusion.code.clean_data import *
# from dreamdiffusion.code.clean_data import *
# import pandas as pd

# df = pd.read_csv("../comp-523-dreamscape/dreamdiffusion/datasets/muse_eeg_export.csv")
# relevant_eeg_data = drop_irrelevants(df)
# eeg_signals = relevant_eeg_data[relevant_eeg_data.columns].values
# eeg_signals = standardize_eeg_data(eeg_signals=eeg_signals)
# eeg_tensors = torch.tensor(eeg_signals, dtype=torch.float32)
# torch.save(eeg_tensors, "../comp-523-dreamscape/dreamdiffusion/data/gavry_signals.pth")

result = clean_data("0/muse_eeg_export.csv", 0)
# Works with both GCS and local version.