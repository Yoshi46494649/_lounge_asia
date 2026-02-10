const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');

try {
  const content = fs.readFileSync(indexPath, 'utf8');
  
  const checks = [
    { search: 'id="faq"', message: 'FAQ Section ID exists' },
    { search: 'Common Questions', message: 'Header "Common Questions" exists' },
    { search: 'First time at Lounge?', message: 'Group 1 Header exists' },
    { search: 'Community & Partners', message: 'Group 2 Header exists' },
    { search: 'Q1. Can I come alone?', message: 'Q1 (Group 1) exists' },
    { search: 'Q7. What happens when I arrive?', message: 'Q7 (Group 1) exists' },
    { search: 'Q1. Is this a dating group or a social club?', message: 'Q1 (Group 2) exists' },
    { search: 'Q6. Is there an official app?', message: 'Q6 (Group 2) exists' },
    { search: '<details', message: 'Use of <details> tag detected' },
    { search: 'bg-gray-900', message: 'Background color class detected' }
  ];

  let passed = true;
  console.log('Verifying FAQ Section Implementation in index.html...');
  
  checks.forEach(check => {
    if (content.includes(check.search)) {
      console.log(`[PASS] ${check.message}`);
    } else {
      console.error(`[FAIL] ${check.message} - Not found!`);
      passed = false;
    }
  });

  if (passed) {
    console.log('\nAll checks passed! FAQ section is correctly implemented.');
    process.exit(0);
  } else {
    console.error('\nSome checks failed. implementation might be incomplete.');
    process.exit(1);
  }

} catch (err) {
  console.error('Error reading index.html:', err);
  process.exit(1);
}
