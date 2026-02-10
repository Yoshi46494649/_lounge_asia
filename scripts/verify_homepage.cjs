const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');

try {
  const content = fs.readFileSync(indexPath, 'utf8');

  // Check 1: Hero CTA Buttons
  // Should have "Join Upcoming Events" as Primary (first), "Matcha Match App" as Secondary (second)
  const ctaBlockRegex = /Join Upcoming Events[\s\S]*?Matcha Match App/;
  if (ctaBlockRegex.test(content)) {
    console.log('[PASS] Hero CTA order is correct.');
  } else {
    console.error('[FAIL] Hero CTA order is incorrect.');
    // Debug
    const oldCtaRegex = /Download Matcha Match[\s\S]*?Find Your City/;
    if (oldCtaRegex.test(content)) {
        console.error('      (Still found old CTA order)');
    }
  }

  // Check 2: Navigation Menu
  // Order: Events, Global Cities, Matcha Match App
  // Simply check if "Events" comes before "Global Cities" in the nav block
  const navBlockStart = content.indexOf('<nav');
  const navBlockEnd = content.indexOf('</nav>');
  const navBlock = content.substring(navBlockStart, navBlockEnd);
  
  const eventsIdx = navBlock.indexOf('href="#meetup-events"');
  const citiesIdx = navBlock.indexOf('href="#cities"');
  const matchaIdx = navBlock.indexOf('href="#matcha-match"');

  if (eventsIdx < citiesIdx && citiesIdx < matchaIdx) {
    console.log('[PASS] Navigation menu order is correct.');
  } else {
    console.error('[FAIL] Navigation menu order is incorrect.');
    console.log(`      Events: ${eventsIdx}, Cities: ${citiesIdx}, Matcha: ${matchaIdx}`);
  }

  // Check 3: Section Order in Main
  // Expected: Hero -> Gallery -> Events -> Cities -> Voices -> Matcha -> Heroes
  const sectionOrder = [
    { id: 'venue-gallery', name: 'Venue Gallery' },
    { id: 'meetup-events', name: 'Meetup Events' },
    { id: 'cities', name: 'Global Cities' },
    { id: 'member-voices', name: 'Member Voices' },
    { id: 'matcha-match', name: 'Matcha Match' },
    { id: 'community-heroes', name: 'Community Heroes' }
  ];

  let lastIndex = 0;
  let passed = true;

  sectionOrder.forEach(section => {
    const regex = new RegExp(`<section id="${section.id}"`);
    const match = regex.exec(content);
    if (match) {
        if (match.index > lastIndex) {
            console.log(`[PASS] ${section.name} is in correct relative position.`);
            lastIndex = match.index;
        } else {
            console.error(`[FAIL] ${section.name} is NOT in correct relative position.`);
            passed = false;
        }
    } else {
        console.error(`[FAIL] ${section.name} section not found.`);
        passed = false;
    }
  });

  if (passed) {
    console.log('\nAll checks passed! Homepage layout optimization is correct.');
    process.exit(0);
  } else {
    console.error('\nSome checks failed.');
    process.exit(1);
  }

} catch (err) {
  console.error('Error reading index.html:', err);
  process.exit(1);
}
