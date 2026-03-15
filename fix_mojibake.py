import os
import glob

replacements = {
    '窶・': '–',
    '窶冦': "'m",
    '窶冱': "'s",
    '窶囘': "'d",
    '窶况': "'ve",
    '笳・': '·',
    '次': '👉',
    '脂': '🎟️',
    '・・': '📍',
    '套': '📅',
    '桃': '📍',
    '竊・': '→',
    '櫨': '🔥',
    '査': '🎉',
    '窶': "'" # fallback for any remaining
}

html_files = glob.glob('*.html') + glob.glob('speed-dating/**/*.html', recursive=True)
count = 0

for file_path in html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for k, v in replacements.items():
            new_content = new_content.replace(k, v)
            
        if content != new_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {file_path}")
            count += 1
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"Total files fixed: {count}")
