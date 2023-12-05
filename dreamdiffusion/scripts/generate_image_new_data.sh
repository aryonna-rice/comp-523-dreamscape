#!/bin/bash

#SBATCH -p a100-gpu
#SBATCH -N 1
#SBATCH --mem=64g
#SBATCH -n 1
#SBATCH -t 12:00:00
#SBATCH --qos gpu_access
#SBATCH --gres=gpu:1
#SBATCH --mail-type=all
#SBATCH --mail-user=aryonna@email.unc.edu
source activate dreamdiffusion

# Print environment variables
echo "Environment Variables:"
env
# Your paths and files
PROJECT_DIR="/nas/longleaf/home/aryonna/Dreamscape/comp-523-dreamscape/dreamdiffusion"
SCRIPTS_DIR="$PROJECT_DIR/code"
GENERATION_CHECKPOINT_PATH="$PROJECT_DIR/pretrains/generation/checkpoint.pth"

# Task 3: Generate Images with Trained Checkpoints
echo "Task 3: Generate Images with Trained Checkpoints"
python3 $SCRIPTS_DIR/generate_images.py --dataset EEG --model_path $GENERATION_CHECKPOINT_PATH