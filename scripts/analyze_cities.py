import os
import re
from bs4 import BeautifulSoup

cities = ['brisbane.html', 'sydney.html', 'melbourne.html', 'bangkok.html', 'hcmc.html', 'tokyo.html']
base_dir = r'c:\Users\yoshi\Pictures\xcopy\_lounge_asia'

for city in cities:
    path = os.path.join(base_dir, city)
    if not os.path.exists(path):
        print(f"File not found: {city}")
        continue
        
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
        print(f"\n================ {city} ================")
        
        heroes_section = soup.find('section', id='community-heroes')
        if heroes_section:
            print("Hosts Order:")
            h4_tags = heroes_section.find_all('h4')
            roles = heroes_section.find_all('div', class_=re.compile(r'uppercase.*rounded-full'))
            
            for i in range(min(len(h4_tags), len(roles))):
                print(f"  {i+1}. {h4_tags[i].text.strip()} - {roles[i].text.strip()}")
        else:
            print("Heroes section not found.")
            
        faq_section = soup.find('section', id='faq')
        if faq_section:
            qas = faq_section.find_all('details')
            print(f"FAQ Count: {len(qas)}")
        else:
            print("FAQ count: 0")
            
        text_content = soup.get_text()
        if city != 'brisbane.html':
            brisbane_count = sum(1 for match in re.finditer(r'\bBrisbane\b', text_content, flags=re.IGNORECASE))
            if brisbane_count > 0:
                print(f"WARNING: 'Brisbane' appears {brisbane_count} times in {city}")
                
            hero_sec = soup.find('section', class_=re.compile('hero-bg'))
            if hero_sec:
                hero_text = re.sub(r'\s+', ' ', hero_sec.text.strip())
                print(f"Hero Title: {hero_text[:120]}...")
