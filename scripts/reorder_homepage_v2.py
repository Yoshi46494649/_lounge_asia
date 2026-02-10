import re
import os

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Markers
M_MATCHA = '<!-- ===== Matcha Match Section ===== -->'
M_CITIES = '<!-- ===== Global Cities Section ===== -->'
M_EVENTS = '<!-- ===== Meetup Events Section ===== -->'
M_GALLERY = '<!-- ===== Venue & Atmosphere Gallery (Swipeable) ===== -->'
M_VOICES = '<!-- ===== Member Interviews (YouTube Shorts) ===== -->'
M_HEROES = '<!-- ===== Community Heroes Section ===== -->'

# Find Indices
idx_matcha = content.find(M_MATCHA)
idx_cities = content.find(M_CITIES)
idx_events = content.find(M_EVENTS)
idx_gallery = content.find(M_GALLERY)
idx_voices = content.find(M_VOICES)
idx_heroes = content.find(M_HEROES)

# Validate markers found
if -1 in [idx_matcha, idx_cities, idx_events, idx_gallery, idx_voices, idx_heroes]:
    print("Error: Could not find all section markers.")
    print(f"Matcha: {idx_matcha}")
    print(f"Cities: {idx_cities}")
    print(f"Events: {idx_events}")
    print(f"Gallery: {idx_gallery}")
    print(f"Voices: {idx_voices}")
    print(f"Heroes: {idx_heroes}")
    exit(1)

# Verify order (sanity check)
# Expected: Matcha < Cities < Events < Gallery < Voices < Heroes
indices = [idx_matcha, idx_cities, idx_events, idx_gallery, idx_voices, idx_heroes]
if indices != sorted(indices):
    print("Error: Sections are not in expected order. Cannot safely reorder via slicing.")
    print(f"Indices: {indices}")
    exit(1)

# Extract Blocks
# Be careful with newlines or spaces. We take everything from Marker to Marker.
block_matcha = content[idx_matcha:idx_cities]
block_cities = content[idx_cities:idx_events]
block_events = content[idx_events:idx_gallery]
block_gallery = content[idx_gallery:idx_voices]
block_voices = content[idx_voices:idx_heroes]

# Reconstruct
# New Order: Gallery -> Events -> Cities -> Voices -> Matcha
# And we keep everything before Matcha (Head+Hero) and everything after Voices (Heroes...)

pre_content = content[:idx_matcha]
post_content = content[idx_heroes:]

new_middle = (
    block_gallery + 
    block_events + 
    block_cities + 
    block_voices + 
    block_matcha
)

new_content = pre_content + new_middle + post_content

# --- Update CTA in Hero ---
# Pattern: Link to #matcha-match (Primary) AND Link to #cities (Secondary)
# We want: Link to #meetup-events (Primary) AND Link to #matcha-match (Secondary)

# Old Primary
# <a href="#matcha-match" ...> Download Matcha Match </a>
# We'll use regex to find and replace the block
cta_pattern = re.compile(
    r'(<a href="#matcha-match"[^>]*?>\s*Download Matcha Match\s*</a>)\s*'
    r'(<a href="#cities"[^>]*?>\s*Find Your City\s*</a>)',
    re.DOTALL
)

def cta_replacer(match):
    original_btn1 = match.group(1)
    original_btn2 = match.group(2)
    
    # We want to extract classes to preserve styling
    # But for simplicity and robustness, since we know the exact classes used in index.html (Step 90),
    # we can rebuild them with new href and text.
    
    # Extract classes from btn1
    btn1_class_match = re.search(r'class="([^"]+)"', original_btn1)
    btn1_class = btn1_class_match.group(1) if btn1_class_match else ""
    
    # Extract classes from btn2
    btn2_class_match = re.search(r'class="([^"]+)"', original_btn2)
    btn2_class = btn2_class_match.group(1) if btn2_class_match else ""
    
    new_btn1 = f'<a href="#meetup-events" class="{btn1_class}">\n                            Join Upcoming Events\n                        </a>'
    new_btn2 = f'<a href="#matcha-match" class="{btn2_class}">\n                            Matcha Match App\n                        </a>'
    
    return f"{new_btn1}\n                        {new_btn2}"

# Apply CTA replacement
if cta_pattern.search(new_content):
    new_content = cta_pattern.sub(cta_replacer, new_content)
    print("CTA updated successfully.")
else:
    print("Warning: CTA pattern not found. Manual check required.")

# --- Update Navigation ---
# Old: Global Cities, Matcha Match App, Become a Leader, Partners, Contact
# New: Events, Global Cities, Matcha Match App, Become a Leader, Partners, Contact

nav_pattern = re.compile(
    r'(<nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">)(.*?)(</nav>)',
    re.DOTALL
)

def nav_replacer(match):
    # Just replace the inner HTML with the new links list
    # We use hardcoded classes from the file
    base_class = "hover:text-white transition-colors"
    primary_class = "hover:text-brand-primary transition-colors text-brand-primary"
    
    links = [
        f'<a href="#meetup-events" class="{base_class}">Events</a>',
        f'<a href="#cities" class="{base_class}">Global Cities</a>',
        f'<a href="#matcha-match" class="{primary_class}">Matcha Match App</a>',
        f'<a href="#leaders" class="{base_class}">Become a Leader</a>',
        f'<a href="#partners" class="{base_class}">Partners</a>',
        f'<a href="#contact" class="{base_class}">Contact</a>'
    ]
    
    return f'{match.group(1)}\n                ' + '\n                '.join(links) + f'\n            {match.group(3)}'

if nav_pattern.search(new_content):
    new_content = nav_pattern.sub(nav_replacer, new_content)
    print("Navigation updated successfully.")
else:
    print("Warning: Navigation pattern not found. Manual check required.")


# Write Content
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully reordered sections (V2) and updated CTA/Nav.")
