import fs from 'fs';
import path from 'path';

const files = [
  'index.html', 'brisbane.html', 'sydney.html', 'melbourne.html',
  'tokyo.html', 'bangkok.html', 'hcmc.html'
];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add loading="lazy" to all img tags missing it, except logos
  content = content.replace(/<img\s([^>]+)>/g, (match, attrs) => {
    if (attrs.includes('loading=')) return match;
    if (attrs.includes('logo')) return match; // Very safe heuristic to skip nav logos
    if (attrs.includes('hero')) return match; // Skip hero images if any
    
    return `<img ${attrs.replace(/\s*$/, '')} loading="lazy">`;
  });

  // Also add lazy loading to iframes if missing
  content = content.replace(/<iframe\s([^>]+)>/g, (match, attrs) => {
     if (attrs.includes('loading=')) return match;
     return `<iframe ${attrs.replace(/\s*$/, '')} loading="lazy">`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated images and iframes in ${file}`);
}
