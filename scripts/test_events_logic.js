const fs = require('fs');
const path = require('path');

// Mock DOM
const document = {
    createElement: (tag) => ({
        tag,
        className: '',
        innerHTML: '',
        appendChild: () => {},
        children: []
    }),
    getElementById: () => ({
        innerHTML: '',
        appendChild: (child) => console.log('Container appended:', child)
    })
};
global.document = document;

// Load events
const eventsPath = path.join(__dirname, '../assets/events.json');
const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

// Re-implement logic from feeds.js to test it
function testLogic() {
    console.log(`Loaded ${events.length} events.`);

    const cityConfigs = {
        'Brisbane': { icon: '🐨', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
        'Sydney': { icon: '🌉', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
        'Melbourne': { icon: '☕', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
        'Tokyo': { icon: '🗼', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
    };

    const uniqueCityEvents = [];
    const citiesFound = new Set();

    ['Brisbane', 'Sydney', 'Melbourne', 'Tokyo'].forEach(city => {
        const event = events.find(e => {
            const venue = e.venue || 'Brisbane';
            return venue.toLowerCase().includes(city.toLowerCase());
        });
        
        if (event) {
            uniqueCityEvents.push(event);
            citiesFound.add(event.link);
            console.log(`Found event for ${city}: ${event.title} (${event.eventDate})`);
        } else {
            console.log(`No event found for ${city}`);
        }
    });

    const remainingEvents = events.filter(e => !citiesFound.has(e.link));
    let displayList = [...uniqueCityEvents, ...remainingEvents];
    
    displayList = displayList.reduce((acc, current) => {
        const x = acc.find(item => item.link === current.link);
        if (!x) return acc.concat([current]);
        return acc;
    }, []).slice(0, 4);

    console.log('\n--- Display List ---');
    displayList.forEach(event => {
        const city = event.venue || 'Brisbane';
        let configKey = 'Brisbane';
        if (city.includes('Sydney')) configKey = 'Sydney';
        if (city.includes('Melbourne')) configKey = 'Melbourne';
        if (city.includes('Tokyo')) configKey = 'Tokyo';
        
        const dateObj = new Date(event.eventDate);
        // Time format might depend on locale, but let's see what Node gives us
        const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); // Simulating browser
        // In Node, toLocaleTimeString might default to system locale/timezone if not specified or might utilize ICU.
        // It's a good proxy.
        
        console.log(`Event: ${event.title}`);
        console.log(`  City Key: ${configKey}`);
        console.log(`  Time (System Local): ${timeStr}`);
        console.log(`  ISO Date: ${event.eventDate}`);
        console.log('----------------');
    });
}

testLogic();
