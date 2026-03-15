
import os

def fix_file():
    filepath = 'index.html'
    # Try different encodings
    encodings = ['utf-8', 'shift_jis', 'euc-jp', 'cp932']
    content = None
    used_encoding = None
    
    for enc in encodings:
        try:
            with open(filepath, 'r', encoding=enc) as f:
                content = f.readlines()
                used_encoding = enc
                # Check if "Ho Chi Minh City" exists in this encoding
                if any("Ho Chi Minh City" in line for line in content):
                    print(f"Used encoding: {enc}")
                    break
        except:
            continue
            
    if content is None:
        print("Could not read file with any tested encoding")
        return

    # Find the range around "Ho Chi Minh City" (line 584)
    # The user said isolated text under cards.
    # From previous view_file:
    # 574: HCMC
    # 584: Ho Chi Minh City
    
    start_idx = -1
    for i, line in enumerate(content):
        if "<!-- HCMC -->" in line and i > 570:
            start_idx = i
            break
            
    if start_idx == -1:
        # Fallback search for Ho Chi Minh City
        for i, line in enumerate(content):
            if "Ho Chi Minh City" in line:
                # Go up to <!-- HCMC --> or <a>
                j = i
                while j > 0 and "<!-- HCMC -->" not in content[j]:
                    j -= 1
                start_idx = j
                break

    if start_idx != -1:
        # Find </a> after this
        end_idx = -1
        for i in range(start_idx, len(content)):
            if "</a>" in content[i]:
                end_idx = i
                break
        
        if end_idx != -1:
            print(f"Removing lines {start_idx+1} to {end_idx+1}")
            del content[start_idx:end_idx+1]
            
            # Write back
            with open(filepath, 'w', encoding=used_encoding) as f:
                f.writelines(content)
            print("Successfully updated index.html")
        else:
            print("Could not find end of block </a>")
    else:
        print("Could not find start of block <!-- HCMC --> or Ho Chi Minh City")

if __name__ == "__main__":
    fix_file()
