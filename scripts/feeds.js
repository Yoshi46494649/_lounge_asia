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
// Instagram Feed with Caching
function initInstagramFeed() {
    const container = document.getElementById('instagram-feed-container');
    if (!container) return;

    const CACHE_KEY = 'lounge_asia_insta_cache';
    const CACHE_TIME = 3600000; // 1 hour

    // 1. Try to load from cache first for immediate display
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        try {
            const { timestamp, posts } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_TIME) {
                renderInstagramGrid(posts, container);
                return; // Exit if cache is fresh
            } else {
                // If cache is expired, show it but fetch new in background (stale-while-revalidate)
                renderInstagramGrid(posts, container);
            }
        } catch (e) {
            console.error('Cache parse error', e);
        }
    }

    // 2. Fetch fresh data
    const FEED_URL = 'https://feeds.behold.so/7d5XSu3SRu6EpNpo755e';
    fetch(FEED_URL)
        .then(response => response.json())
        .then(data => {
            const feedItems = Array.isArray(data) ? data : (data.posts || []);
            const posts = feedItems.map(item => ({
                url: (item.mediaType === 'VIDEO' || item.mediaType === 'REEL') ? (item.thumbnailUrl || item.mediaUrl) : item.mediaUrl,
                caption: item.caption || '',
                permalink: item.permalink || 'https://instagram.com/_lounge_asia'
            })); 
            
            // Render and Cache
            renderInstagramGrid(posts, container);
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                posts: posts
            }));
        })
        .catch(err => {
            console.warn('Instagram feed failed', err);
            if (!cachedData) renderFallbackInstagram(container); // Only fallback if no cache
        });
}

// Meetup Feed with Caching
function initMeetupFeed() {
    const container = document.getElementById('meetup-events-container');
    if (!container) return;

    const CACHE_KEY = 'lounge_asia_meetup_cache';
    const CACHE_TIME = 3600000; // 1 hour

    // 1. Try cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        try {
            const { timestamp, events } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_TIME) {
                processAndRenderEvents(events, container);
                return;
            } else {
                processAndRenderEvents(events, container);
            }
        } catch (e) { console.error('Cache error', e); }
    }

    // 2. Fetch fresh
    fetch('assets/events.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            let fetchedEvents = Array.isArray(data) ? data : [];
            processAndRenderEvents(fetchedEvents, container);
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                events: fetchedEvents
            }));
        })
        .catch(err => {
            console.warn('Failed to load Meetup events', err);
            if (!cachedData) processAndRenderEvents([], container);
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

                <!-- Event Details (Date Removed) -->
                <div class="mb-6 flex-grow flex items-center justify-center flex-col">
                     <!-- Frequency text removed by user request -->
                </div>

                <div class="mt-auto w-full">
                    <a href="${item.link}" target="_blank" class="block w-full bg-white/5 hover:bg-brand-primary hover:text-white text-gray-300 border border-white/10 hover:border-transparent font-bold py-3.5 px-4 rounded-lg transition-all duration-300 text-sm backdrop-blur-sm uppercase tracking-wider">
                        Sign up on Meetup
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

function renderInstagramGrid(posts, container) {
    container.innerHTML = '';
    // Apply grid directly to container to avoid nesting issues with existing HTML classes
    container.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6';
    
    // Take top 6 posts (or 4/8 to match grid?)
    // User wants them "visible". Let's stick to 6-8 if we have them.
    // If we have 4 cols, 4 or 8 looks best. 6 leaves empty space.
    // Let's take up to 4 for now to ensure one nice row? Or 8 for two rows?
    // Screenshot had 4 items.
    // Let's use up to 4 items for a clean single row on huge screens, or 2 rows on mobile.
    // Spec says "Follow our journey".
    // I will use 4 items to ensure large size and clean layout.
    posts.slice(0, 4).forEach(post => {
        const item = document.createElement('a');
        item.href = post.permalink;
        item.target = '_blank';
        item.className = 'group relative overflow-hidden rounded-xl aspect-square card-glow cursor-pointer bg-gray-800';
        
        item.innerHTML = `
            <img src="${post.url}" alt="${post.caption || 'Lounge Asia Instagram'}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100">
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-white font-bold">@_lounge_asia</span>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderFallbackInstagram(container) {
    // Leave static HTML as is
    console.warn('Instagram feed unavailable, using static fallback.');
}
