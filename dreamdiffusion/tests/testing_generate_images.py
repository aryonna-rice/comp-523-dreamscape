"Testing generating images only."
import os
print("Current working directory:", os.getcwd())


from dreamdiffusion.code.generate_images import *
#gs://patient-eeg-signals/0/05-12-2023-20-31-20.pth

generate_image(0, "gs://patient-eeg-signals/0/05-12-2023-20-31-20.pth")
