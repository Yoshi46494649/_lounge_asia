
const eventsUrl = 'https://www.meetup.com/lounge-asia-east-asian-community-mixer-jp-cn-tw-kr/events/rss/';

async function fetchRSS() {
    try {
        const response = await fetch(eventsUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            console.error(`Failed: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.log('Body:', text.substring(0, 500));
            return;
        }

        const text = await response.text();
        console.log('Success! RSS Feed length:', text.length);
        console.log('Preview:', text.substring(0, 200));
        
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchRSS();
