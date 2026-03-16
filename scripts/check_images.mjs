import fs from 'fs';
import path from 'path';

const files = [
  'index.html', 'brisbane.html', 'sydney.html', 'melbourne.html',
  'tokyo.html', 'bangkok.html', 'hcmc.html'
];

let missingLazy = 0;
let missingAlt = 0;

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Find all img tags
  const imgRegex = /<img[^>]+>/g;
  let matches = content.match(imgRegex) || [];

  for (const img of matches) {
    if (!img.includes('loading="lazy"')) {
      missingLazy++;
      console.log(`${file}: Missing lazy: ${img}`);
    }
    if (!img.match(/alt="[^"]*"/)) {
      missingAlt++;
      console.log(`${file}: Missing alt: ${img}`);
    }
  }
}
console.log(`Total missing lazy: ${missingLazy}`);
console.log(`Total missing alt: ${missingAlt}`);
