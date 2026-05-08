import os
import subprocess
import json
import time

# Configurations
MEDIA_DIR = 'media'
OPTIMIZED_DIR = os.path.join(MEDIA_DIR, 'optimized')
THUMBNAILS_DIR = os.path.join(MEDIA_DIR, 'thumbnails')
SITE_DATA_PATH = 'site_data.json'

# Target sizes
DISPLAY_SIZE = "1920x1920>"  # Max dimension 1920, only shrink if larger
THUMB_SIZE = "600x600>"      # Max dimension 600

def optimize_image(filename):
    input_path = os.path.join(MEDIA_DIR, filename)
    opt_path = os.path.join(OPTIMIZED_DIR, filename)
    thumb_path = os.path.join(THUMBNAILS_DIR, filename)

    # Convert to display version
    if not os.path.exists(opt_path) or os.path.getmtime(input_path) > os.path.getmtime(opt_path):
        print(f"Optimizing for display: {filename}")
        subprocess.run([
            'magick', input_path,
            '-resize', DISPLAY_SIZE,
            '-quality', '82',
            '-strip',  # Remove metadata to save space
            opt_path
        ])

    # Convert to thumbnail version
    if not os.path.exists(thumb_path) or os.path.getmtime(input_path) > os.path.getmtime(thumb_path):
        print(f"Generating thumbnail: {filename}")
        subprocess.run([
            'magick', input_path,
            '-resize', THUMB_SIZE,
            '-quality', '75',
            '-strip',
            thumb_path
        ])

def main():
    if not os.path.exists(OPTIMIZED_DIR): os.makedirs(OPTIMIZED_DIR)
    if not os.path.exists(THUMBNAILS_DIR): os.makedirs(THUMBNAILS_DIR)

    # Get all jpg files in media/
    images = [f for f in os.listdir(MEDIA_DIR) if f.lower().endswith(('.jpg', '.jpeg')) and os.path.isfile(os.path.join(MEDIA_DIR, f))]
    
    total = len(images)
    print(f"Found {total} images to process.")

    start_time = time.time()
    for i, img in enumerate(images):
        print(f"[{i+1}/{total}] Processing {img}...")
        optimize_image(img)
    
    end_time = time.time()
    print(f"\nOptimization complete in {end_time - start_time:.2f} seconds.")

if __name__ == "__main__":
    main()
