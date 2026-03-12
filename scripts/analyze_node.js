const fs = require('fs');
const path = require('path');

const cities = ['brisbane.html', 'sydney.html', 'melbourne.html', 'bangkok.html', 'hcmc.html', 'tokyo.html'];
const baseDir = 'c:\\Users\\yoshi\\Pictures\\xcopy\\_lounge_asia';

cities.forEach(city => {
    try {
        const filePath = path.join(baseDir, city);
        if (!fs.existsSync(filePath)) return;
        
        const content = fs.readFileSync(filePath, 'utf8');
        const qas = (content.match(/<details\b/g) || []).length;
        
        const hostMatch = content.match(/<section id="community-heroes"[\s\S]*?<\/section>/);
        let hosts = [];
        if (hostMatch) {
            const h4s = hostMatch[0].match(/<h4[^>]*>(.*?)<\/h4>/g);
            if (h4s) hosts = h4s.map(h => h.replace(/<[^>]*>/g, '').trim());
            
            // Also get roles
            const rolesMatch = hostMatch[0].match(/tracking-widest uppercase rounded-full[^>]*>\s*(.*?)\s*<\/div>/g) || hostMatch[0].match(/uppercase rounded-full[^>]*>\s*(.*?)\s*<\/div>/g);
            if (rolesMatch && rolesMatch.length === hosts.length) {
                hosts = hosts.map((h, i) => `${h} (${rolesMatch[i].replace(/<[^>]*>/g, '').trim()})`);
            }
        }
        
        // Find text that shouldn't be here
        let brisbaneMentions = 0;
        if (city !== 'brisbane.html') {
            brisbaneMentions = (content.match(/\bBrisbane\b/gi) || []).length;
        }
        
        console.log(`\n--- ${city} ---`);
        console.log(`QAs Count: ${qas}`);
        console.log(`Hosts Order: ${hosts.join(' -> ')}`);
        console.log(`Brisbane Mentions: ${brisbaneMentions}`);
        
        // Optional: Look at specific sections for Brisbane
        if (brisbaneMentions > 0) {
            const heroMatch = content.match(/<section class="hero-bg[^>]*>([\s\S]*?)<\/section>/);
            if (heroMatch && heroMatch[0].match(/\bBrisbane\b/gi)) {
                console.log(`  WARNING: 'Brisbane' found in Hero Section of ${city}!`);
            }
        }
        
    } catch (e) {
        console.error(`Error on ${city}:`, e.message);
    }
});
