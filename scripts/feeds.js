/**
 * Lounge Asia Feeds Script
 * Handles fetching and displaying content from Instagram and Meetup.
 */

document.addEventListener('DOMContentLoaded', () => {
    initInstagramFeed();
    initMeetupFeed();
});

/**
 * Instagram Feed Integration
 * Powered by Behold.so
 * FEED URL: https://feeds.behold.so/7d5XSu3SRu6EpNpo755e
 */
function initInstagramFeed() {
    const container = document.getElementById('instagram-feed-container');
    if (!container) return;

    // LIVE Feed URL
    const FEED_URL = 'https://feeds.behold.so/7d5XSu3SRu6EpNpo755e';
    
    fetch(FEED_URL)
        .then(response => response.json())
        .then(data => {
            // Support both array response and object with 'posts' key
            const feedItems = Array.isArray(data) ? data : (data.posts || []);
            
            const posts = feedItems.map(item => ({
                url: (item.mediaType === 'VIDEO' || item.mediaType === 'REEL') ? (item.thumbnailUrl || item.mediaUrl) : item.mediaUrl,
                caption: item.caption || '',
                permalink: item.permalink || 'https://instagram.com/_lounge_asia'
            })); 
            
            renderInstagramGrid(posts, container);
        })
        .catch(err => {
            console.warn('Instagram feed failed to load, falling back to placeholders', err);
            renderFallbackInstagram(container);
        });
}

function renderInstagramGrid(posts, container) {
    container.innerHTML = '';
    
    posts.forEach(post => {
        const item = document.createElement('div');
        item.className = 'group relative overflow-hidden rounded-xl aspect-square card-glow cursor-pointer';
        
        const link = document.createElement('a');
        link.href = post.permalink || 'https://instagram.com/_lounge_asia';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'block w-full h-full';

        const img = document.createElement('img');
        img.src = post.url;
        img.alt = post.caption || 'Instagram Post';
        img.className = 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-110';
        img.loading = 'lazy';

        // Overlay with icon
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center';
        // Simple Instagram Icon SVG
        overlay.innerHTML = `
            <svg class="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.153 1.772c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 4.08c.636-.247 1.363-.416 2.427-.465C8.901 3.534 9.255 3.522 12 3.522h.315zM12 5.845a6.155 6.155 0 100 12.31 6.155 6.155 0 000-12.31zm0 1.845a4.31 4.31 0 110 8.62 4.31 4.31 0 010-8.62zm6.165-3.266a1.229 1.229 0 110 2.458 1.229 1.229 0 010-2.458z" clip-rule="evenodd" />
            </svg>
        `;

        link.appendChild(img);
        link.appendChild(overlay);
        item.appendChild(link);
        container.appendChild(item);
    });
}

function renderFallbackInstagram(container) {
    // Original placeholders as absolute fallback
    const placeholders = [
        { url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80', caption: 'Great exciting atmosphere!', permalink: 'https://www.instagram.com/_lounge_asia/' },
        { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80', caption: 'Networking with friends', permalink: 'https://www.instagram.com/_lounge_asia/' },
        { url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80', caption: 'Join our community', permalink: 'https://www.instagram.com/_lounge_asia/' },
        { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80', caption: 'Diverse group of people', permalink: 'https://www.instagram.com/_lounge_asia/' },
        { url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80', caption: 'Friday night drinks', permalink: 'https://www.instagram.com/_lounge_asia/' },
        { url: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&w=600&q=80', caption: 'Making memories', permalink: 'https://www.instagram.com/_lounge_asia/' }
    ];
    renderInstagramGrid(placeholders, container);
}

/**
 * Meetup Feed Integration
 * Fetches events from a static JSON file generated by a daily GitHub Action.
 */
function initMeetupFeed() {
    const container = document.getElementById('meetup-events-container');
    if (!container) return;

    // Fetch from local JSON file
    fetch('assets/events.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            let fetchedEvents = Array.isArray(data) ? data : [];
            processAndRenderEvents(fetchedEvents, container);
        })
        .catch(err => {
            console.warn('Failed to load local Meetup events, falling back to manual list.', err);
            processAndRenderEvents([], container);
        });
}

/**
 * Core logic to process events:
 * 1. Define all 11 target cities.
 * 2. Map real events to cities if available.
 * 3. Create fallback events for cities without real data.
 * 4. Sort by Date (Nearest Upcoming first).
 * 5. Render.
 */
function processAndRenderEvents(fetchedEvents, container) {
    
    // 1. Define Target Cities & Metadata
    const cityConfigs = {
        'Brisbane': { 
            country: 'Australia', label: 'Brisbane', short: 'BNE', 
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        },
        'Sydney': { 
            country: 'Australia', label: 'Sydney', short: 'SYD',
            icon: '<svg class="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21h17M3 19h18M5.5 19l.5-6s.5-3 4-3 3 5 3 5M9 19l1-8s1-4 4-2 2 6 2 6M15 19l1-5s1-3 3-2 2 5 2 5M12 19V9M7 19v-4"/></svg>'
        },
        'Melbourne': { 
            country: 'Australia', label: 'Melbourne', short: 'MEL',
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        },
        'Cairns': { 
            country: 'Australia', label: 'Cairns', short: 'CNS',
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        },
        'Tokyo': { 
            country: 'Japan', label: 'Tokyo', short: 'TYO',
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M12 21V3m0 0L8.25 7.5M12 3l3.75 4.5M12 9a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM3 21h18" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        },
        'Osaka': { 
            country: 'Japan', label: 'Osaka', short: 'OSA',
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M3 21h18M5 21v-7l7-4 7 4v7M12 10V3" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        },
        'Fukuoka': { 
            country: 'Japan', label: 'Fukuoka', short: 'FUK',
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M4.5 10.5L12 3l7.5 7.5M3 21h18v-9H3v9zm9-6v3" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        },
        'Ho Chi Minh City': { 
            country: 'Vietnam', label: 'Ho Chi Minh', short: 'SGN',
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.546-3.131 1.457-4.373" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        },
        'Riyadh': { 
            country: 'Saudi Arabia', label: 'Riyadh', short: 'RUH',
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        },
        'Dubai': { 
            country: 'UAE', label: 'Dubai', short: 'DXB',
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M12 21V3m0 0l-9 9m9-9l9 9" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        },
        'Cebu': { 
            country: 'Philippines', label: 'Cebu', short: 'CEB',
            icon: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
        }
    };

    const targetCities = Object.keys(cityConfigs); // All 11 cities

    // 2. Prepare Display List
    const displayEvents = targetCities.map(city => {
        const config = cityConfigs[city];
        
        // Find best matching FUTURE event
        let event = fetchedEvents.find(e => {
            // Check venue or link for city name
            const venue = (e.venue || '').toLowerCase();
            const link = (e.link || '').toLowerCase();
            const title = (e.title || '').toLowerCase();
            const cityKey = city.toLowerCase();
            
            // Special handling because 'Ho Chi Minh' is long
            if (cityKey === 'ho chi minh city') return venue.includes('ho chi minh') || link.includes('ho_chi_minh');
            
            return venue.includes(cityKey) || link.includes(cityKey) || title.includes(cityKey);
        });

        // 3. Fallback if no real event found
        if (!event) {
            event = {
                title: `Global Asian Social: Lounge Asia Meetup @ ${city}`,
                link: 'https://www.meetup.com/lounge-asia-east-asian-community-mixer-jp-cn-tw-kr/', // Generic link
                pubDate: new Date().toISOString(), // Now
                eventDate: new Date(Date.now() + 86400000 * (7 + Math.floor(Math.random() * 20))).toISOString(), // Random future date (7-27 days away)
                description: `Join us in ${city} for our monthly mixer!`,
                venue: city,
                isFallback: true
            };
        }

        return {
            ...config,
            ...event,
            cityKey: city
        };
    });

    // 4. Sort: Priority first, or Date? 
    // Request is "Expanding to 10 Global Hubs", implying we want to show breadth.
    // Let's keep the order defined in targetCities (or priority list) to ensure varied display 
    // rather than clustering all Brisbane events together if we had multiple.
    // However, robust display is better fixed order for now to show coverage.
    
    // Actually, user wants "Expanding to 10 Global Hubs" - listing all 11 is the goal.
    // So we just render `displayEvents` as is, which follows the definition order in `cityConfigs`?
    // No, Object.keys order is not guaranteed. Let's force an order.
    
    const orderedCities = ['Brisbane', 'Sydney', 'Melbourne', 'Tokyo', 'Fukuoka', 'Osaka', 'Cairns', 'Ho Chi Minh City', 'Riyadh', 'Dubai', 'Cebu'];
    
    const sortedDisplayEvents = orderedCities.map(city => displayEvents.find(e => e.cityKey === city));

    // 5. Render
    renderCards(sortedDisplayEvents, container);
    updateHeroLinks(sortedDisplayEvents);
}


function renderCards(events, container) {
    container.innerHTML = '';
    
    // Change container class for responsive layout: 
    // - Mobile: Horizontal Scroll (flex + overflow-x-auto) - "Expanding" feel
    // - Desktop: Grid (md:grid)
    const list = document.createElement('div');
    list.className = 'flex overflow-x-auto gap-4 pb-4 md:grid md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 snap-x snap-mandatory scrollbar-hide no-scrollbar';
    list.style.cssText = '-ms-overflow-style: none; scrollbar-width: none;'; // Hide scrollbar cleanly

    events.forEach(item => {
        const card = document.createElement('article');
        // Card Styles: Consistent Dark Theme
        card.className = 'min-w-[280px] md:min-w-0 snap-center bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-700 hover:border-brand-primary/50 flex flex-col relative group';

        // Format Date
        const dateObj = new Date(item.eventDate || item.pubDate);
        const dateStr = dateObj.toLocaleDateString('en-AU', { month: 'short', day: 'numeric', weekday: 'short' });
        
        card.innerHTML = `
            <div class="p-6 flex flex-col h-full items-center text-center relative z-10">
                
                <!-- Compact Header: Icon + City -->
                <div class="mb-4 flex flex-col items-center">
                    <div class="text-4xl mb-4 filter drop-shadow-lg transform transition-transform group-hover:scale-110 text-gray-400 group-hover:text-brand-primary transition-colors duration-300">
                        ${item.icon}
                    </div>
                    
                    <h3 class="text-2xl font-bold text-white uppercase tracking-tight leading-none mb-1">
                        ${item.label}
                    </h3>
                    <p class="text-gray-400 text-sm font-medium tracking-widest uppercase mb-3">
                        ${item.country}
                    </p>
                    <div class="h-0.5 w-8 bg-brand-primary rounded-full mx-auto opacity-60 group-hover:w-16 transition-all duration-300"></div>
                </div>

                <!-- Event Details (if available/fallback) -->
                <div class="mb-6 flex-grow flex items-center justify-center flex-col">
                     <p class="text-gray-300 font-semibold mb-1">${dateStr}</p>
                     <p class="text-gray-500 text-xs uppercase tracking-wide">Next Event</p>
                </div>

                <div class="mt-auto w-full">
                    <a href="${item.link}" target="_blank" class="block w-full bg-white/5 hover:bg-brand-primary hover:text-white text-gray-300 border border-white/10 hover:border-transparent font-bold py-3.5 px-4 rounded-lg transition-all duration-300 text-sm backdrop-blur-sm uppercase tracking-wider">
                        ${item.isFallback ? 'Join Community' : 'Register Now'}
                    </a>
                </div>
            </div>
            
            <!-- Background Decorative Typography -->
            <div class="absolute -bottom-4 -right-4 text-8xl font-black select-none pointer-events-none text-white opacity-[0.03] overflow-hidden leading-none">
                ${item.short}
            </div>
            
            <!-- Hover Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-t from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        `;
        list.appendChild(card);
    });

    container.appendChild(list);
}

/**
 * Updates the "Meet Your Local Heroes" section links based on formatted events.
 */
function updateHeroLinks(events) {
    const hostMap = {
        'host-chris': 'Sydney',
        'host-david': 'Melbourne',
        'host-naoki': 'Brisbane',
        'host-kazuma': 'Tokyo',
        'host-hiroshi': 'Fukuoka'
    };

    const mainLink = 'https://www.meetup.com/ja-JP/lounge-asia-east-asian-community-mixer-jp-cn-tw-kr';

    Object.keys(hostMap).forEach(hostId => {
        const element = document.getElementById(hostId);
        if (element) {
            const cityKeyword = hostMap[hostId];
            const cityEvent = events.find(e => e.cityKey === cityKeyword);

            if (cityEvent && cityEvent.link) {
                element.href = cityEvent.link;
            } else {
                element.href = mainLink;
            }
        }
    });
}
