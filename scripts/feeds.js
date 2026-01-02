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
 * Note: To display real data, you need to connect your account via a service like Behold.so
 * and replace the FEED_URL below.
 */
function initInstagramFeed() {
    const container = document.getElementById('instagram-feed-container');
    if (!container) return;

    // CONFIGURATION: Replace this URL with your actual feed JSON URL from Behold.so or similar
    const FEED_URL = 'https://feeds.behold.so/7d5XSu3SRu6EpNpo755e'; 
    
    // Placeholder data to show before integration is complete
    const placeholders = [
        { url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&q=80', caption: 'Great exciting atmosphere!' },
        { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80', caption: 'Networking with friends' },
        { url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=400&q=80', caption: 'Join our community' },
        { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80', caption: 'Diverse group of people' },
        { url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=400&q=80', caption: 'Friday night drinks' },
        { url: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&w=400&q=80', caption: 'Making memories' }
    ];

    if (!FEED_URL) {
        renderInstagramGrid(placeholders, container, true);
        return;
    }

    fetch(FEED_URL)
        .then(response => response.json())
        .then(data => {
            // Support both array response and object with 'posts' key
            const feedItems = Array.isArray(data) ? data : (data.posts || []);
            
            const posts = feedItems.map(item => ({
                url: (item.mediaType === 'VIDEO' || item.mediaType === 'REEL') ? (item.thumbnailUrl || item.mediaUrl) : item.mediaUrl,
                caption: item.caption || '',
                permalink: item.permalink || 'https://instagram.com/_lounge_asia'
            })).slice(0, 6);
            
            renderInstagramGrid(posts, container);
        })
        .catch(err => {
            console.warn('Instagram feed failed to load, falling back to placeholders', err);
            renderInstagramGrid(placeholders, container, true);
        });
}

function renderInstagramGrid(posts, container, isPlaceholder = false) {
    container.innerHTML = '';
    
    posts.forEach(post => {
        const item = document.createElement('div');
        item.className = 'group relative overflow-hidden rounded-xl aspect-square card-glow';
        
        const link = document.createElement('a');
        link.href = post.permalink || 'https://instagram.com/_lounge_asia';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'block w-full h-full';

        const img = document.createElement('img');
        img.src = post.url;
        img.alt = post.caption || 'Instagram Post';
        img.className = 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110';
        img.loading = 'lazy';

        // Overlay with icon
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center';
        overlay.innerHTML = '<span class="text-white text-3xl"><i class="fab fa-instagram"></i></span>'; // Assuming FontAwesome or similar, or use SVG

        link.appendChild(img);
        link.appendChild(overlay);
        item.appendChild(link);
        container.appendChild(item);
    });

    if (isPlaceholder) {
        const notice = document.createElement('div');
        notice.className = 'col-span-full text-center text-xs text-gray-500 mt-2';
        notice.textContent = 'Follow us @_lounge_asia (Preview Mode)';
        container.appendChild(notice);
    }
}

/**
 * Meetup Feed Integration
 * Uses RSS to JSON converter to fetch public events.
 */
function initMeetupFeed() {
    const container = document.getElementById('meetup-events-container');
    if (!container) return;

    // Meetup Group URLname is required here. 
    // Found "Lounge Asia" -> likely "lounge-asia-brisbane" or similar.
    // IF THIS FAILS, check the exact group URL name on Meetup.com
    const MEETUP_GROUP_URLNAME = 'lounge-asia-east-asian-community-mixer-jp-cn-tw-kr'; 
    const GROUP_URL = `https://www.meetup.com/${MEETUP_GROUP_URLNAME}/`;
    const RSS_URL = `${GROUP_URL}events/rss/`;
    const CONVERTER_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    fetch(CONVERTER_URL)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                const upcomingEvents = filterAndSortEvents(data.items);
                
                if (upcomingEvents.length > 0) {
                    renderMeetupEvents(upcomingEvents, container);
                } else {
                    // Try fallback events if RSS is empty but we know events exist
                    renderFallbackEvents(container);
                }
            } else {
                renderFallbackEvents(container);
            }
        })
        .catch(err => {
            console.error('Failed to load Meetup events', err);
            renderFallbackEvents(container);
        });
}

function renderFallbackEvents(container) {
    // Manual fallback events provided by user
    const manualEvents = [
        {
            title: "TUE NIGHT Asian Background Social: Lounge Asia Meetup (Easy English)",
            pubDate: "2026-01-06 18:00:00",
            link: "https://www.meetup.com/lounge-asia-east-asian-community-mixer-jp-cn-tw-kr/events/",
            venue: "Brisbane"
        },
        {
            title: "⚠️ [CHANGE OF DATE & VENUE] Asian Background Social: Lounge Asia Meetup",
            pubDate: "2026-01-10 17:00:00",
            link: "https://www.meetup.com/lounge-asia-east-asian-community-mixer-jp-cn-tw-kr/events/",
            venue: "Sydney"
        },
        {
            title: "TUE NIGHT Asian Background Social: Lounge Asia Meetup (Easy English)",
            pubDate: "2026-01-20 18:00:00",
            link: "https://www.meetup.com/lounge-asia-east-asian-community-mixer-jp-cn-tw-kr/events/",
            venue: "Brisbane"
        },
        {
            title: "WED NIGHT Asian Background Social: Lounge Asia Meetup (Easy English)",
            pubDate: "2026-01-21 17:00:00",
            link: "https://www.meetup.com/lounge-asia-east-asian-community-mixer-jp-cn-tw-kr/events/",
            venue: "Melbourne"
        }
    ];

    const upcomingEvents = filterAndSortEvents(manualEvents);
    if (upcomingEvents.length > 0) {
         renderMeetupEvents(upcomingEvents, container);
    } else {
        renderNoEvents(container, `https://www.meetup.com/lounge-asia-east-asian-community-mixer-jp-cn-tw-kr/`);
    }
}

/**
 * Filter events to show only future ones and sort by date (nearest first).
 * @param {Array} events - List of event objects from RSS feed
 * @returns {Array} - Sorted list of upcoming events
 */
function filterAndSortEvents(events) {
    const now = new Date();
    
    return events
        .filter(event => {
            // event.pubDate is typically the event date in Meetup RSS (check validity)
            // If pubDate is just publish date, this might be wrong, but based on usage it seems to be the event date.
            const eventDate = new Date(event.pubDate);
            return eventDate >= now;
        })
        .sort((a, b) => {
            return new Date(a.pubDate) - new Date(b.pubDate);
        });
}

function renderMeetupEvents(events, container) {
    container.innerHTML = '';
    const list = document.createElement('div');
    list.className = 'grid gap-6 md:grid-cols-2 lg:grid-cols-3';

    // Show up to 3 upcoming events
    events.slice(0, 3).forEach(event => {
        const card = document.createElement('article');
        card.className = 'bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-yellow-500/50 flex flex-col';

        const dateObj = new Date(event.pubDate);
        const dateStr = dateObj.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
        const timeStr = dateObj.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });

        card.innerHTML = `
            <div class="p-6 flex flex-col h-full">
                <div class="flex justify-between items-start mb-4">
                    <div class="bg-yellow-500 text-gray-900 font-bold text-xs uppercase px-2 py-1 rounded">
                        Upcoming
                    </div>
                </div>
                <h3 class="text-xl font-bold text-white mb-2 line-clamp-2">
                    <a href="${event.link}" target="_blank" class="hover:text-yellow-400 transition-colors">
                        ${event.title}
                    </a>
                </h3>
                <div class="space-y-2 text-gray-400 text-sm mb-6 flex-grow">
                    <div class="flex items-center gap-2">
                        <span>📅</span> <span>${dateStr} • ${timeStr}</span>
                    </div>
                     <div class="flex items-center gap-2">
                        <span>📍</span> <span class="line-clamp-1">${event.venue || 'Brisbane, QLD'}</span>
                    </div>
                </div>
                <a href="${event.link}" target="_blank" class="text-center w-full bg-gray-700 hover:bg-yellow-500 hover:text-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors border border-gray-600 hover:border-yellow-500">
                    RSVP on Meetup
                </a>
            </div>
        `;
        list.appendChild(card);
    });

    container.appendChild(list);
}

function renderNoEvents(container, groupUrl) {
    container.innerHTML = `
        <div class="text-center bg-gray-800/50 p-8 rounded-xl border border-gray-700 border-dashed">
            <p class="text-gray-300 text-lg mb-2">No upcoming events scheduled right now.</p>
            <p class="text-gray-500 text-sm">Join our Meetup group to get notified when we post one!</p>
            <a href="${groupUrl}" target="_blank" class="inline-block mt-4 text-yellow-500 hover:text-yellow-400 font-semibold">
                Visit our Meetup Page &rarr;
            </a>
        </div>
    `;
}
