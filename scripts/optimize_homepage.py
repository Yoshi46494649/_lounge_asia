import re
import os

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Define Sections to Extract
# patterns = {
#     'matcha': r'(<!-- ===== Matcha Match Section ===== -->.*?)(?=<!-- =====)',
#     'cities': r'(<!-- ===== Global Cities Section ===== -->.*?)(?=<!-- =====)',
#     ...
# }
# Using more robust extraction finding start and end comments or next section start

def extract_section(soup, section_id):
    # This approach assumes standard formatting. 
    # Let's use regex to find the block.
    # Pattern: <!-- ===== Title ===== --> ... </section>
    pattern = re.compile(r'(<!-- ===== .*? ===== -->\s*<section id="' + section_id + r'".*?</section>)', re.DOTALL)
    match = pattern.search(soup)
    if match:
        return match.group(1)
    return None

# Extracting content blocks
matcha_section = extract_section(content, 'matcha-match')
cities_section = extract_section(content, 'cities')
events_section = extract_section(content, 'meetup-events')
gallery_section = extract_section(content, 'venue-gallery')
voices_section = extract_section(content, 'member-voices')

if not all([matcha_section, cities_section, events_section, gallery_section, voices_section]):
    print("Error: Could not find all sections.")
    # Debug
    print(f"Matcha: {matcha_section is not None}")
    print(f"Cities: {cities_section is not None}")
    print(f"Events: {events_section is not None}")
    print(f"Gallery: {gallery_section is not None}")
    print(f"Voices: {voices_section is not None}")
    exit(1)

# 2. Reconstruct Content
# The order we want: 
# [Hero] (remains)
# [Gallery]
# [Events]
# [Cities]
# [Voices]
# [Matcha]
# [Heroes] (remains)

# We need to find where Matcha starts and Voices ends to replace that whole block.
# Matcha is currently the first after Hero. Voices is the last before Heroes.
# Wait, let's check the original order in file:
# Hero
# Matcha Match
# Global Cities
# Meetup Events
# Venue Gallery
# Member Interviews (Voices)
# Community Heroes

# So the block to replace starts at Matcha Match section and ends at Member Interviews section.
start_marker = '<!-- ===== Matcha Match Section ===== -->'
end_marker = '<!-- ===== Community Heroes Section ===== -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Error: Could not find start/end markers for the block replacement.")
    exit(1)

# New Block Content
new_order_content = (
    gallery_section + "\n\n        " +
    events_section + "\n\n        " +
    cities_section + "\n\n        " +
    voices_section + "\n\n        " +
    matcha_section + "\n\n        "
)

# Replace the block
new_content = content[:start_idx] + new_order_content + content[end_idx:]

# 3. Update Hero CTA
# Pattern: Link to #matcha-match (Primary) AND Link to #cities (Secondary)
# We want: Link to #meetup-events (Primary) AND Link to #matcha-match (Secondary)

# Old Primary
old_cta_1 = r'<a href="#matcha-match" class="bg-brand-primary(.*?)\s*Download Matcha Match\s*</a>'
# New Primary
new_cta_1 = r'<a href="#meetup-events" class="bg-brand-primary\1\n                            Join Upcoming Events\n                        </a>'

# Old Secondary
old_cta_2 = r'<a href="#cities" class="bg-white/10(.*?)\s*Find Your City\s*</a>'
# New Secondary
new_cta_2 = r'<a href="#matcha-match" class="bg-white/10\1\n                            Matcha Match App\n                        </a>'

# Apply Regex Sub
# Note: Doing this carefully. 
# Let's match the block containing both buttons to be safe.
cta_block_pattern = re.compile(r'(<div class="flex flex-col sm:flex-row justify-center gap-4">\s*)(<a href="#matcha-match".*?</a>)(\s*)(<a href="#cities".*?</a>)(\s*</div>)', re.DOTALL)

def cta_replacer(match):
    prefix = match.group(1)
    # Old btn 1 logic - we want this style but new text/href
    btn1_style_match = re.search(r'class="(.*?)"', match.group(2))
    btn1_style = btn1_style_match.group(1) if btn1_style_match else ""
    
    # Old btn 2 logic
    btn2_style_match = re.search(r'class="(.*?)"', match.group(4))
    btn2_style = btn2_style_match.group(1) if btn2_style_match else ""

    # New Btn 1 (Primary Style, Events Link)
    new_btn1 = f'<a href="#meetup-events" class="{btn1_style}">\n                            Join Upcoming Events\n                        </a>'
    
    # New Btn 2 (Secondary Style, Matcha Link)
    new_btn2 = f'<a href="#matcha-match" class="{btn2_style}">\n                            Matcha Match App\n                        </a>'
    
    return f"{prefix}{new_btn1}{match.group(3)}{new_btn2}{match.group(5)}"

new_content = cta_block_pattern.sub(cta_replacer, new_content)


# 4. Update Navigation
# Old: Global Cities, Matcha Match App, Become a Leader, Partners, Contact
# New: Events, Cities, App, Leaders, (Partners?), Contact
# Let's keep Partners as it was there.
# Order: Events, Cities, App, Leaders, Partners, Contact

nav_pattern = re.compile(r'(<nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">)(.*?)(</nav>)', re.DOTALL)

def nav_replacer(match):
    header = match.group(1)
    footer = match.group(3)
    # Construct new links
    # We can reuse classes from one of the existing links, e.g. the first one
    # But let's just hardcode the standard class used in existing code
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
    
    return f"{header}\n                " + "\n                ".join(links) + f"\n            {footer}"

new_content = nav_pattern.sub(nav_replacer, new_content)

# Write Content
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully reordered sections and updated CTA/Nav.")
