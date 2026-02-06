from PIL import Image
import os
import sys

def process_image(input_path, output_path):
    try:
        if not os.path.exists(input_path):
            print(f"Error: {input_path} does not exist.")
            return False

        with Image.open(input_path) as img:
            print(f"Original size: {img.size}")
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Center crop to square
            width, height = img.size
            new_size = min(width, height)
            
            left = (width - new_size) / 2
            top = (height - new_size) / 2
            right = (width + new_size) / 2
            bottom = (height + new_size) / 2
            
            # Crop
            img_cropped = img.crop((left, top, right, bottom))
            
            # Resize to 400x400
            img_resized = img_cropped.resize((400, 400), Image.Resampling.LANCZOS)
            
            img_resized.save(output_path, quality=90)
            print(f"Successfully processed {input_path} -> {output_path} (400x400)")
            return True

    except Exception as e:
        print(f"Error processing image: {e}")
        return False

if __name__ == "__main__":
    src = 'assets/kazuma_raw.jpg'
    dest = 'assets/kazuma.jpg'
    
    if os.path.exists(src):
        process_image(src, dest)
    else:
        print(f"Could not find {src}")
        sys.exit(1)
