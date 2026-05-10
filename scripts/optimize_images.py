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
    base_name = os.path.splitext(filename)[0]
    
    # Optimized JPG
    opt_path = os.path.join(OPTIMIZED_DIR, filename)
    # Optimized WebP
    webp_path = os.path.join(OPTIMIZED_DIR, f"{base_name}.webp")
    
    # Thumb JPG
    thumb_path = os.path.join(THUMBNAILS_DIR, filename)
    # Thumb WebP
    thumb_webp_path = os.path.join(THUMBNAILS_DIR, f"{base_name}.webp")

    # Convert to display versions
    for out_path, quality, format_name in [
        (opt_path, '82', 'jpg'),
        (webp_path, '75', 'webp')
    ]:
        if not os.path.exists(out_path) or os.path.getmtime(input_path) > os.path.getmtime(out_path):
            print(f"Optimizing for display ({format_name}): {filename}")
            cmd = ['magick', input_path, '-resize', DISPLAY_SIZE, '-quality', quality, '-strip', out_path]
            subprocess.run(cmd)

    # Convert to thumbnail versions
    for out_path, quality, format_name in [
        (thumb_path, '75', 'jpg'),
        (thumb_webp_path, '65', 'webp')
    ]:
        if not os.path.exists(out_path) or os.path.getmtime(input_path) > os.path.getmtime(out_path):
            print(f"Generating thumbnail ({format_name}): {filename}")
            cmd = ['magick', input_path, '-resize', THUMB_SIZE, '-quality', quality, '-strip', out_path]
            subprocess.run(cmd)

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
