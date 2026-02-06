from PIL import Image
import os
import sys

def process_image(input_path, output_path):
    try:
        if not os.path.exists(input_path):
            print(f"Error: {input_path} does not exist.")
            return False

        with Image.open(input_path) as img:
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
            
            # Resize to reasonable size (400x400)
            img_resized = img_cropped.resize((400, 400), Image.Resampling.LANCZOS)
            
            img_resized.save(output_path, quality=85)
            print(f"Successfully processed {input_path} -> {output_path}")
            return True

    except Exception as e:
        print(f"Error processing image: {e}")
        return False

if __name__ == "__main__":
    # Prioritize 1.png as it's likely the first upload
    sources = ['assets/1.png', 'assets/2.png']
    processed = False
    
    for src in sources:
        if os.path.exists(src):
            print(f"Found source image: {src}")
            if process_image(src, 'assets/kazuma.jpg'):
                processed = True
                break
    
    if not processed:
        print("Could not find or process any source image.")
        sys.exit(1)
