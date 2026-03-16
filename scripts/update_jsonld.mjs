import fs from 'fs';
import path from 'path';

const files = [
  'index.html', 'brisbane.html', 'sydney.html', 'melbourne.html',
  'tokyo.html', 'bangkok.html', 'hcmc.html'
];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Match the JSON-LD array script block just before <!-- Mobile Menu JS -->
  const regex = /<script type="application\/ld\+json">\s*\[([\s\S]*?)\]\s*<\/script>\s*<!-- Mobile Menu JS/;
  const match = content.match(regex);
  if (match) {
    try {
      let schemas = JSON.parse(`[${match[1]}]`);
      
      // Add BreadcrumbList Schema
      const hasBreadcrumb = schemas.some(s => s['@type'] === 'BreadcrumbList');
      if (!hasBreadcrumb) {
        let breadcrumbs = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.loungeasia.com.au/"
          }]
        };

        if (file !== 'index.html') {
          let cityName = file.replace('.html', '');
          let formattedName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
          if (cityName === 'hcmc') formattedName = "Ho Chi Minh City";
          
          breadcrumbs.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": formattedName,
            "item": `https://www.loungeasia.com.au/${file}`
          });
        }
        
        schemas.push(breadcrumbs);
      }

      // Add FAQPage to index.html if missing
      if (file === 'index.html' && !schemas.some(s => s['@type'] === 'FAQPage')) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Can I come alone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Most people come solo. We'll say hi, help you settle in, and introduce you if you'd like." } },
            { "@type": "Question", "name": "Do I need to book?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, RSVP is essential. Please click 'Going' on our Meetup event page." } },
            { "@type": "Question", "name": "Is there an entry fee?", "acceptedAnswer": { "@type": "Answer", "text": "Usually, there is a small cover charge at the door or a one-drink minimum to support the venue." } },
            { "@type": "Question", "name": "What language can I speak?", "acceptedAnswer": { "@type": "Answer", "text": "English, Japanese, Chinese, Taiwanese, or Korean—all welcome! Use whatever feels most natural." } },
            { "@type": "Question", "name": "Is this a dating group or a social club?", "acceptedAnswer": { "@type": "Answer", "text": "Friendship comes first. Our events are for making friends naturally." } },
            { "@type": "Question", "name": "Is there an official app?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We are developing 'Matcha Match'—a verified app for safer, smarter connections." } }
          ]
        });
      }

      // Format back to string and replace
      let newJsonText = JSON.stringify(schemas, null, 2);
      // Properly format the replacement block
      let newBlock = `<script type="application/ld+json">\n    ${newJsonText.split('\\n').join('\\n    ')}\n    </script>\n    <!-- Mobile Menu JS`;
      content = content.replace(regex, newBlock);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`SUCCESS: Updated ${file}`);
    } catch (e) {
      console.error(`ERROR parsing ${file}:`, e);
    }
  } else {
    console.log(`WARNING: Could not match JSON-LD block in ${file}`);
  }
}
