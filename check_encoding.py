
import chardet

with open('index.html', 'rb') as f:
    rawdata = f.read(10000)
    result = chardet.detect(rawdata)
    print(f"Encoding: {result['encoding']}")
    
with open('index.html', 'rb') as f:
    content = f.read()
    if b'\x00' in content:
        print("Null bytes detected (possible UTF-16 or binary)")
    else:
        print("No null bytes detected")
