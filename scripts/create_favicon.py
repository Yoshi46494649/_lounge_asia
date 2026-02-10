"""
Create Enhanced Favicon
=======================

This script takes a source image and creates a high-quality circular favicon with a white border.
It saves the result as a multi-size .ico file and a high-res .png file.

Usage:
    python create_favicon.py
"""

import os
from PIL import Image, ImageDraw, ImageOps

def create_circular_favicon(input_path, output_dir, border_width=15):
    """
    Creates a circular favicon with a white border from the input image.
    
    Args:
        input_path (str): Path to the source image.
        output_dir (str): Directory to save the output files.
        border_width (int): Width of the white border in pixels (for the largest size).
    """
    
    if not os.path.exists(input_path):
        print(f"Error: Input file not found at {input_path}")
        return

    try:
        # Load image
        img = Image.open(input_path).convert("RGBA")
        
        # Work with a large square size for high quality
        size = min(img.size)
        img = ImageOps.fit(img, (size, size), centering=(0.5, 0.5))
        
        # Create a circular mask (antialiased)
        # We draw it 4x larger and resize down for better antialiasing
        mask_size = (size * 4, size * 4)
        mask = Image.new('L', mask_size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0) + mask_size, fill=255)
        mask = mask.resize((size, size), Image.Resampling.LANCZOS)
        
        # Apply mask
        output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        output.paste(img, (0, 0), mask)
        
        # Add white border
        # To do this clean, we can draw a white circle behind the image
        # or stroke the edge. Let's draw a white circle behind, slightly larger? 
        # Actually, let's just draw a white ring on top or better:
        # Create a new image, draw white circle, paste masked image on top scaled down slightly.
        
        final_size = size
        final_img = Image.new('RGBA', (final_size, final_size), (0, 0, 0, 0))
        
        # Draw white background circle
        bg_mask_size = (final_size * 4, final_size * 4)
        bg_mask = Image.new('L', bg_mask_size, 0)
        bg_draw = ImageDraw.Draw(bg_mask)
        bg_draw.ellipse((0, 0) + bg_mask_size, fill=255)
        bg_mask = bg_mask.resize((final_size, final_size), Image.Resampling.LANCZOS)
        
        white_bg = Image.new('RGBA', (final_size, final_size), (255, 255, 255, 0))
        white_bg.paste((255, 255, 255, 255), (0, 0), bg_mask)
        
        # Paste the white circle
        final_img.alpha_composite(white_bg)
        
        # Resize original circular image to fit inside the border
        inner_size = final_size - (border_width * 2)
        inner_img = output.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
        
        # Paste inner image centered
        offset = border_width
        final_img.paste(inner_img, (offset, offset), inner_img)
        
        # Ensure output directory exists
        os.makedirs(output_dir, exist_ok=True)
        
        # Save PNG
        png_path = os.path.join(output_dir, "favicon.png")
        final_img.save(png_path)
        print(f"Saved: {png_path}")
        
        # Save ICO
        ico_path = os.path.join(output_dir, "favicon.ico")
        icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
        final_img.save(ico_path, sizes=icon_sizes)
        print(f"Saved: {ico_path}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    SOURCE_PATH = r"G:\マイドライブ\3.Family\Friend\日中台交流会 Lounge\logo\fabicon\ファビコン用サイズ 512\fabicon asian community lounge asia.png"
    OUTPUT_DIR = r"c:\Users\yoshi\Pictures\xcopy\_lounge_asia\assets"
    
    create_circular_favicon(SOURCE_PATH, OUTPUT_DIR, border_width=20)
