
import fs from 'fs';
import path from 'path';

const RSS_URL = 'https://www.meetup.com/lounge-asia-east-asian-community-mixer-jp-cn-tw-kr/events/rss/';
const OUTPUT_FILE = path.join(process.cwd(), 'assets', 'events.json');

async function fetchRSS() {
    console.log(`Fetching RSS from ${RSS_URL}...`);
    try {
        const response = await fetch(RSS_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
        }

        const xml = await response.text();
        console.log(`Fetched ${xml.length} bytes. Parsing...`);
        const events = parseRSS(xml);
        
        console.log(`Found ${events.length} events.`);
        
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(events, null, 2));
        console.log(`Saved to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Error updating events:', error);
        process.exit(1);
    }
}

function parseRSS(xml) {
    const events = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    const now = new Date();

    while ((match = itemRegex.exec(xml)) !== null) {
        const itemContent = match[1];
        const title = extractTag(itemContent, 'title');
        const link = extractTag(itemContent, 'guid') || extractTag(itemContent, 'link');
        const pubDateRaw = extractTag(itemContent, 'pubDate');
        let description = extractTag(itemContent, 'description');
        
        // 1. Venue Detection
        let venue = 'Brisbane'; // Default
        const titleLower = title.toLowerCase();
        const descLower = description.toLowerCase();

        if (titleLower.includes('brisbane')) venue = 'Brisbane';
        else if (titleLower.includes('sydney')) venue = 'Sydney';
        else if (titleLower.includes('melbourne')) venue = 'Melbourne';
        else if (titleLower.includes('cairns')) venue = 'Cairns';
        else if (titleLower.includes('osaka')) venue = 'Osaka';
        else if (titleLower.includes('tokyo')) venue = 'Tokyo';
        else if (titleLower.includes('ho chi minh')) venue = 'Ho Chi Minh City';
        else {
            if (descLower.includes('brisbane')) venue = 'Brisbane';
            else if (descLower.includes('sydney')) venue = 'Sydney';
            else if (descLower.includes('melbourne')) venue = 'Melbourne';
        }

        // DEBUG: Log first item description to find date pattern
        if (events.length === 0) {
            console.log("DEBUG FIRST ITEM DESC:", description.substring(0, 500));
        }

        // 2. Event Date Extraction
        // Strategy: 
        // A. Explicit Date in description or title (e.g. "Jan 9")
        // B. Recurring Day in title (e.g. "TUE NIGHT") -> Calculate next occurrence
        
        let eventDate = new Date(pubDateRaw);
        let isEstimated = false;

        const combinedText = (title + ' ' + description).replace(/\s+/g, ' ');
        
        // Regex for "Jan 9" or "January 9"
        const monthDayRegex = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2})/i;
        const mdMatch = combinedText.match(monthDayRegex);
        
        if (mdMatch) {
            const monthStr = mdMatch[1];
            const dayStr = mdMatch[2];
            const currentYear = new Date().getFullYear();
            
            // Try current year
            let possibleDate = new Date(`${monthStr} ${dayStr}, ${currentYear} 18:00`); // Default 6 PM
            
            // If this date is in the past (more than a few days), assume next year
            if (possibleDate < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
                possibleDate.setFullYear(currentYear + 1);
            }
            eventDate = possibleDate;
        } else {
            // Day of Week Fallback
            const days = {
                'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRI': 5, 'SAT': 6
            };
            
            let targetDay = -1;
            for (const [dayName, dayIndex] of Object.entries(days)) {
                if (title.toUpperCase().includes(dayName)) {
                    targetDay = dayIndex;
                    break;
                }
            }
            
            if (targetDay !== -1) {
                eventDate = getNextDayOccurrence(targetDay);
                eventDate.setHours(18, 0, 0, 0); // Default 6 PM
                isEstimated = true;
            }
        }
        
        // Final sanity check: If date is way in the past/invalid, force it to be future relative to now?
        // No, keep it as derived, frontend handles "past" display.

        // 3. Clean Description
        // Remove CDATA, HTML tags, truncate
        let cleanDesc = description
            .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '') // Strip tags
            .trim();
        
        cleanDesc = cleanDesc.substring(0, 300) + (cleanDesc.length > 300 ? '...' : '');

        events.push({
            title,
            link,
            pubDate: pubDateRaw,
            eventDate: eventDate.toISOString(),
            isEstimated,
            venue, 
            description: cleanDesc
        });
    }

    return events;
}

function getNextDayOccurrence(dayIndex) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    // If today is the day, assume it's today (or next week if strictly future required, but today is fine)
    const currentDay = date.getDay();
    let distance = (dayIndex + 7 - currentDay) % 7;
    // If today is the day, distance is 0. That implies "Today".
    
    date.setDate(date.getDate() + distance);
    return date;
}

function extractTag(xml, tagName) {
    const startTag = `<${tagName}`;
    const endTag = `</${tagName}>`;
    
    const startIndex = xml.indexOf(startTag);
    if (startIndex === -1) return '';
    
    const contentStartIndex = xml.indexOf('>', startIndex) + 1;
    const endIndex = xml.indexOf(endTag, contentStartIndex);
    
    if (endIndex === -1) return '';
    
    let content = xml.substring(contentStartIndex, endIndex).trim();
    
    // Remove CDATA wrapper if present
    if (content.startsWith('<![CDATA[')) {
        content = content.substring(9);
        const cdataEnd = content.lastIndexOf(']]>');
        if (cdataEnd !== -1) {
            content = content.substring(0, cdataEnd);
        }
    }
    
    return content;
}

fetchRSS();
