
import { chromium } from 'playwright';
import path from 'path';

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Scroll to events
    const selector = '#meetup-events-container';
    await page.waitForSelector(selector, { timeout: 5000 });
    await page.evaluate(() => {
        document.getElementById('meetup-events-container').scrollIntoView();
    });
    
    // Wait a bit for images/render
    await page.waitForTimeout(2000); // 2 sec

    const outputPath = path.resolve('verify_events_final.png');
    console.log(`Taking screenshot to ${outputPath}...`);
    
    await page.screenshot({ path: outputPath, fullPage: false });
    
    await browser.close();
    console.log('Done.');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
