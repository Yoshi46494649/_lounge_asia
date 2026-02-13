import os

def replace_lovable_tags(root_dir):
    target = 'content="https://lovable.dev/opengraph-image-p98pqg.png"'
    replacement = 'content="/assets/hero-real.jpg"'
    
    target_twitter = 'content="@lovable_dev"'
    replacement_twitter = 'content="@LoungeAsia"'
    
    count = 0
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(".html"):
                filepath = os.path.join(dirpath, filename)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content.replace(target, replacement)
                    new_content = new_content.replace(target_twitter, replacement_twitter)
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {filepath}")
                        count += 1
                except Exception as e:
                    print(f"Error reading/writing {filepath}: {e}")
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    replace_lovable_tags(r"c:\Users\yoshi\Pictures\xcopy\_lounge_asia")
