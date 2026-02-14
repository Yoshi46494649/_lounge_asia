const https = require('https');
const { URL } = require('url');

const BASE_URL = 'https://www.loungeasia.com.au';
const PARENTS_URL = 'https://www.loungeasia.com.au/parents';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

function logPass(msg) {
    console.log(`${GREEN}[PASS] ${msg}${RESET}`);
}

function logFail(msg) {
    console.error(`${RED}[FAIL] ${msg}${RESET}`);
}

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, data }));
        }).on('error', (err) => reject(err));
    });
}

function fetchParentsJs(html) {
    // Extract script src from Parents App HTML (e.g. /parents/assets/index-XXXX.js)
    const match = html.match(/src="(\/parents\/assets\/index-.*?\.js)"/);
    if (match && match[1]) {
        return fetchUrl(`${BASE_URL}${match[1]}`);
    }
    return Promise.resolve({ statusCode: 404, data: '' });
}

async function verifyDeployment() {
    console.log(`Starting deployment verification for ${BASE_URL}...\n`);
    let allPassed = true;

    try {
        // 1. Verify Privacy/Terms Links (Must be 200 OK)
        const pages = ['/privacy', '/terms'];
        for (const page of pages) {
            const res = await fetchUrl(`${BASE_URL}${page}`);
            if (res.statusCode === 200 && (res.data.includes("Effective Date") || res.data.includes("Privacy Policy") || res.data.includes("Terms"))) {
                logPass(`${page} is 200 OK and contains valid content.`);
            } else {
                logFail(`${page} returned ${res.statusCode} or missing content.`);
                allPassed = false;
            }
        }

        // 2. Verify Homepage Pre-rendering
        const homeRes = await fetchUrl(BASE_URL);
        if (homeRes.statusCode === 200) {
            const html = homeRes.data;
            
            // Global Hubs
            if (html.includes('Brisbane') && html.includes('Sydney') && html.includes('Melbourne') && html.includes('Tokyo')) {
                logPass("Homepage: 'Global Hubs' content (City names) is pre-rendered.");
            } else {
                logFail("Homepage: 'Global Hubs' content is MISSING in raw HTML (Pre-rendering failed).");
                allPassed = false;
            }

            // Moments
            if (html.includes('alt="Lounge Asia Instagram"') || html.includes('id="instagram-feed-container"')) { 
                 // Stricter check: specific image or container content
                 if (html.includes('assets/gallery-party-1.jpg')) {
                     logPass("Homepage: 'Moments' (Instagram) placeholders are pre-rendered.");
                 } else {
                     logFail("Homepage: 'Moments' placeholders missing.");
                     allPassed = false;
                 }
            } else {
                logFail("Homepage: 'Moments' container missing.");
                allPassed = false;
            }
            
            // Footer Links (Clean URLs) in Homepage
            if (html.includes('href="/privacy"') && html.includes('href="/terms"')) {
                logPass("Homepage: Footer links are using clean URLs (/privacy, /terms).");
            } else {
                logFail("Homepage: Footer links are NOT using clean URLs (Check for .html extension).");
                allPassed = false;
            }

        } else {
            logFail(`Homepage returned ${homeRes.statusCode}`);
            allPassed = false;
        }

        // 3. Verify Parents App Footer Links
        const parentsRes = await fetchUrl(PARENTS_URL);
        if (parentsRes.statusCode === 200) {
           const jsRes = await fetchParentsJs(parentsRes.data);
           if (jsRes.statusCode === 200) {
               if (jsRes.data.includes('href:"/privacy"') || jsRes.data.includes('href:"/terms"') || jsRes.data.includes('href="/privacy"') || jsRes.data.includes('href="/terms"')) {
                   logPass("Parents App: Footer links in JS bundle are using clean URLs.");
               } else {
                   logFail("Parents App: Footer links in JS bundle are MISSING or Incorrect.");
                    allPassed = false;
               }
           } else {
               logFail("Parents App: Could not fetch main JS bundle.");
               allPassed = false;
           }
        } else {
             // 308 might be okay if it redirects to slash-less, but we expect 200 for the clean URL if configured right
             // User provided PARENTS_URL as '.../parents' (no slash) which might redirect to slash or index.html
             // Let's assume strict check on the landing entry point.
             logFail(`Parents App (${PARENTS_URL}) returned ${parentsRes.statusCode}. Check redirects.`);
             allPassed = false;
        }

    } catch (err) {
        console.error("Verification Error:", err);
        allPassed = false;
    }

    if (allPassed) {
        console.log(`\n${GREEN}VERIFICATION SUCCESSFUL: All critical checks passed.${RESET}`);
        process.exit(0);
    } else {
        console.error(`\n${RED}VERIFICATION FAILED: Critical checks failed. Do not announce deployment success.${RESET}`);
        process.exit(1);
    }
}

verifyDeployment();
