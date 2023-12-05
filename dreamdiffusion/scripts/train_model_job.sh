#!/bin/bash

#SBATCH -p l40-gpu
#SBATCH -N 1
#SBATCH --mem=120g
#SBATCH -n 1
#SBATCH -t 7-00:00:00
#SBATCH --qos gpu_access
#SBATCH --gres=gpu:1 # Request one V100 GPU
#SBATCH --mail-type=all
#SBATCH --mail-user=aryonna@email.unc.edu
source activate dreamdiffusion

# Your paths and files
PROJECT_DIR="/nas/longleaf/home/aryonna/Dreamscape/comp-523-dreamscape/DreamDiffusion"
SCRIPTS_DIR="$PROJECT_DIR/code"
PRETRAIN_CHECKPOINT_PATH="$PROJECT_DIR/pretrains/eeg_pretrain/checkpoint.pth"
GENERATION_CHECKPOINT_PATH="$PROJECT_DIR/pretrains/generation/checkpoint.pth"

# Task 1: Pre-training on EEG data
echo "Task 1: Pre-training on EEG data"
# python3 $SCRIPTS_DIR/stageA1_eeg_pretrain.py --mask_ratio 0.75 --num_epoch 800 --batch_size 2
#python3 -m torch.distributed.launch --nproc_per_node=2 $SCRIPTS_DIR/stageA1_eeg_pretrain.py
torchrun --nproc_per_node=1 $SCRIPTS_DIR/stageA1_eeg_pretrain.py
#torchrun --use_env --nproc_per_node=2 $SCRIPTS_DIR/stageA1_eeg_pretrain.py

# Task 2: Finetune with pre-trained fMRI Encoder
#echo "Task 2: Finetune with pre-trained fMRI Encoder"
#python3 $SCRIPTS_DIR/eeg_ldm.py --dataset EEG --num_epoch 300 --batch_size 4 --pretrain_mbm_path $PRETRAIN_CHECKPOINT_PATH

# Task 3: Generate Images with Trained Checkpoints
#echo "Task 3: Generate Images with Trained Checkpoints"
#python3 $SCRIPTS_DIR/gen_eval_eeg.py --dataset EEG --model_path $GENERATION_CHECKPOINT_PATH

