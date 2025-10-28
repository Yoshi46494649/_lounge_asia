import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { SocialShare } from "@/components/blog/SocialShare";
import { SocialProof } from "@/components/blog/SocialProof";
import { WaitlistCTA as BlogWaitlistCTA } from "@/components/blog/WaitlistCTA";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Mock blog post data (in production, this would come from a database)
const blogPostsData: Record<string, any> = {
  "brisbane-asian-meetup-guide-2025": {
    title: "Your Guide to Asian Meetups in Brisbane 2025",
    excerpt: "Step inside Lounge Asia's International Meet Up-Brisbane's open-floor language exchange for Asian professionals and local friends.",
    category: "International Meet Up",
    date: "15/01/2025",
    readTime: "8 min read",
    image: "blog/international-meet-up/meetup-hero.png",
    author: "Lounge Asia Team",
    content: `
      <p>When we opened the doors for the very first Lounge Asia International Meet Up we were equal parts excited and nervous. We dimmed the lights at The Stock Exchange Hotel, spread language prompt cards across the tables, and wondered whether anyone would show up. Within minutes Japanese, Taiwanese, Korean, Singaporean, Malaysian, Australian, British, and Brazilian guests stepped inside, greeting each other in English, Mandarin, Korean, and sometimes a mix of all three. The room warmed quickly-not because of a formal program, but because everyone had turned up to practise languages, trade stories about life in Brisbane, and make new friends.</p>
      
      <h2>Why We Host an Open-Floor Meet Up</h2>
      <p>The International Meet Up exists for people who want community without the pressure of a structured agenda. Rather than speeches or speed rotations, we provide comfortable seating clusters, light background music, and conversation starters that help guests talk about the things that matter-migration journeys, favourite neighbourhood cafes, and how to balance work and family in a new country. The vibe stays relaxed, and the flow of the night is entirely guest-led.</p>
      
      <h2>How the Evening Flows</h2>
      <ul>
        <li><strong>Doors open 6:30 pm:</strong> Guests register at the QR desk, collect a name badge with their preferred language flags, and head straight into the room. There is no MC and no fixed seating chart.</li>
        <li><strong>Conversation hubs:</strong> We organise four thematic corners-career, food, travel, and hobbies. People drift between hubs whenever they like, often switching languages mid-conversation.</li>
        <li><strong>Language exchange wall:</strong> A large whiteboard lists "Looking to practise" and "Happy to help" so that Japanese speakers can find Malay speakers, or a British newcomer can meet someone from Taiwan who has already settled in.</li>
        <li><strong>Soft landing support:</strong> Staff are on standby only to make introductions or answer questions about Brisbane. Once the conversation flows, we step back.</li>
      </ul>
      
      <h2>Stories from the Room</h2>
      <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-[0_18px_36px_rgba(8,12,24,0.4)]">
        <h3 class="mb-3 text-xl font-semibold text-white">Ayaka, Japanese marketing specialist</h3>
        <p>Ayaka moved to Australia six months ago and found it hard to speak beyond work small-talk. During her first Meet Up she floated between the travel hub and the food corner, switching between English and Japanese. "I realised everyone here understands what it feels like to start over," she told us. She still meets up with the Singaporean UX designer she met that night for bubble tea study dates.</p>
      </div>
      <div class="mt-6 rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-[0_18px_36px_rgba(8,12,24,0.4)]">
        <h3 class="mb-3 text-xl font-semibold text-white">Joon, Korean software engineer</h3>
        <p>Joon spends most weekdays coding from home. He came along because a colleague mentioned "a place where you can just walk up to any table." He ended up chatting with an Australian high-school teacher who is learning Korean, and now they run a weekly language swap in West End.</p>
      </div>
      
      <h2>Tips for First-Timers</h2>
      <ul>
        <li><strong>Arrive curious:</strong> Bring a question you genuinely want to ask-such as "What helped you settle into Brisbane?"-and be ready to answer it yourself.</li>
        <li><strong>Move every 15 minutes:</strong> We suggest a gentle timer to keep the energy flowing. If a conversation is great, invite new friends to grab a drink together after the event.</li>
        <li><strong>Share your languages:</strong> Many guests are multilingual. Wearing two flag stickers (for example, Korean and English) makes it easy for others to spot you.</li>
        <li><strong>Follow up the same week:</strong> Swap Instagram handles or WhatsApp details before you leave the room so the connection keeps growing.</li>
      </ul>
      
      <h2>Official Event Snapshot</h2>
      <ul>
        <li><strong>Host:</strong> Lounge Asia - Brisbane's largest Asian professional community (500+ members).</li>
        <li><strong>Focus:</strong> Open-floor international networking, language exchange, and mutual support. No matchmaking, no speeches.</li>
        <li><strong>Participants:</strong> Regular mix of guests from Japan, Taiwan, Korea, Singapore, Malaysia, Australia, the United Kingdom, Brazil, and fellow locals.</li>
        <li><strong>Schedule:</strong> Monthly on a weekday evening at The Stock Exchange Hotel, Level 2.</li>
        <li><strong>Format:</strong> Free seating, self-guided movement, optional conversation prompt cards, and staff connectors.</li>
        <li><strong>Dress code:</strong> Smart casual-breathable fabrics and comfortable sneakers.</li>
        <li><strong>Cost:</strong> Complimentary entry (purchase your own drinks). Donations help cover venue hire.</li>
      </ul>
      
      <h2>Join the Next International Meet Up</h2>
      <p>If you're craving a space where you can speak in more than one language, swap recommendations for the best laksa in town, or simply say "It's nice to meet someone who gets it," this is your night. Add your email below and we will let you know the moment the next Lounge Asia International Meet Up opens for registrations.</p>
    `,
  },
  "asian-dating-brisbane-complete-guide": {
    title: "Asian Dating in Brisbane: The Complete Guide",
    excerpt: "Practical ways to build romantic connections in Brisbane's Asian community and how Speed Dating Asia supports every step.",
    category: "Asian Dating",
    date: "10/01/2025",
    readTime: "8 min read",
    image: "blog/asian-dating/asian-dating-hero.jpg",
    author: "Lounge Asia Team",
    content: `
      <p>Dating in Brisbane can feel complicated when you carry Asian cultural expectations, speak more than one language, and juggle competing family commitments. Lounge Asia created Speed Dating Asia and the International Meet Up to make the process feel natural-no guesswork, just thoughtful conversations with people who understand your background. This guide shares what works in our community and how to prepare for your own dating journey.</p>
      
      <h2>Start with Genuine Community</h2>
      <p>Romance grows faster when you already feel at home. Many couples we know started as friends at the International Meet Up before choosing to book a seat at Speed Dating Asia. Spend a few evenings trading stories about migration, food, and favourite suburbs. When you eventually sit down for a five-minute date, the conversation feels relaxed rather than rehearsed.</p>
      
      <h2>Why Speed Dating Asia Fits Asian Singles</h2>
      <ul>
        <li><strong>Shared context:</strong> Every guest understands what it means to straddle cultures. You can talk about family expectations, bilingual households, or long-distance friendships without spending time explaining the basics.</li>
        <li><strong>Balanced guest list:</strong> We curate a mix of career backgrounds, age groups, and cultural identities so each round feels fair.</li>
        <li><strong>Safe pacing:</strong> Five-minute chats let you explore chemistry quickly while still keeping the evening respectful.</li>
        <li><strong>Opt-in matching:</strong> Only mutual matches receive contact details, giving you full control over who reaches out.</li>
      </ul>
      
      <h2>Participant Stories</h2>
      <div class="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-[0_18px_36px_rgba(8,12,24,0.4)]">
        <h3 class="mb-3 text-xl font-semibold text-white">Ayaka's experience</h3>
        <p>Ayaka arrived from Tokyo for a marketing role and spent months wondering whether she should date locally. After attending the International Meet Up twice she signed up for Speed Dating Asia. "The format helped me practise English without feeling judged," she said. She matched with a Singaporean product manager and the pair now rotate between cooking Japanese and Peranakan dishes at home.</p>
      </div>
      <div class="mt-6 rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-[0_18px_36px_rgba(8,12,24,0.4)]">
        <h3 class="mb-3 text-xl font-semibold text-white">Joon's perspective</h3>
        <p>Joon, a Korean software engineer, described himself as "socially rusty" before joining. He appreciated the structured format-"I didn't have to guess whether someone was open to dating; everyone in the room was." He matched with a Taiwanese UX designer and they now spend Saturdays exploring new cafes across Brisbane.</p>
      </div>
      
      <h2>How to Prepare for Your Session</h2>
      <ol>
        <li><strong>Clarify your intentions:</strong> Are you looking for a serious relationship, exploring possibilities, or wanting to make romantic connections slowly? Knowing your answer makes conversations honest.</li>
        <li><strong>Choose conversation anchors:</strong> Prepare stories about your upbringing, favourite comfort dishes, or how you spend Sundays. These spark richer dialogue than generic job talk.</li>
        <li><strong>Practise active listening:</strong> Reflect back what you hear ("It sounds like your parents still live in Kuala Lumpur-do you visit often?"). Attentiveness stands out.</li>
        <li><strong>Plan a follow-up idea:</strong> Have a cafe, gallery, or market in mind so you can suggest it if you match. Action beats vague promises.</li>
      </ol>
      
      <h2>Keeping Momentum After You Match</h2>
      <p>Once the Speed Dating Asia team emails you a mutual match, reply within 24 to 48 hours. Suggest a casual first meet-up-perhaps bubble tea in Sunnybank, a riverside walk in Kangaroo Point, or a steaming bowl of laksa at West End. Swap expectations early, from communication styles to favourite languages. Respectful pacing is attractive; checking in once or twice a week keeps things moving without pressure.</p>
      
      <h2>Ready to Join?</h2>
      <p>Asian dating in Brisbane doesn't have to feel isolating. Surround yourself with community, book a Speed Dating Asia seat when you're ready, and keep the conversation flowing. Register your interest below and we'll send upcoming round dates, waitlist details, and tips straight to your inbox.</p>
    `,
  },
  "speed-dating-asian-singles-brisbane": {
    title: "Speed Dating for Asian Singles in Brisbane",
    excerpt: "Behind the scenes of our first Speed Dating Asia round-what we learned, who joined, and why the format stays comfortable.",
    category: "Speed Dating",
    date: "05/01/2025",
    readTime: "9 min read",
    image: "blog/speed-dating/speed-dating-hero.jpg",
    author: "Lounge Asia Team",
    content: `
      <p>We launched Speed Dating Asia to give Brisbane's Asian community a comfortable way to explore romance. On opening night we tweaked the lighting, tested the bell for the five-minute rotations, and hoped the seating plan made sense. Then the lift doors opened and guests from Japan, Korea, China, Taiwan, Singapore, Malaysia, Australia, and the United Kingdom began to arrive-some in suits straight from the office, others in smart casual outfits and trainers. Every person admitted feeling nervous, but they still checked in with a smile and took their seats.</p>
      
      <h2>What Actually Happens on the Night</h2>
      <ul>
        <li><strong>Check-in and briefing:</strong> We verify ID, hand out name cards showing first name and initials, and explain how the Like and Super Like system works. There is no welcome drink, just water on the tables so everyone stays clear-headed.</li>
        <li><strong>Five-minute conversations:</strong> Each pairing talks for five minutes before we ring the chime. Men rotate clockwise, women stay seated (or vice versa for specific rounds). Conversation prompt cards such as "What brought you to Brisbane?" or "Describe your ideal weekend" sit on the table if anyone needs a boost.</li>
        <li><strong>Short reset breaks:</strong> After every three rotations we pause for three minutes. Guests stretch, jot down notes on their matching cards, or simply breathe before the next conversation.</li>
        <li><strong>Digital matching:</strong> At the end of the night everyone scans a QR code to submit four Likes and one Super Like. Matches are emailed the next day once both people say yes.</li>
      </ul>
      
      <h2>Observations from the First Round</h2>
      <ul>
        <li><strong>Conversation found its rhythm.</strong> The earliest pairs relied on prompt cards, but by the third rotation laughter spread across the room. One Singaporean data analyst told us, "I never thought five minutes could feel short."</li>
        <li><strong>Culture is a bridge.</strong> Guests swapped stories about balancing Malaysian family expectations with Brisbane workloads, or learning footy rules from Australian colleagues.</li>
        <li><strong>Thoughtful notes mattered.</strong> Several attendees jotted down the pronunciation of each other's names or recommended cafes for a future catch up. Those micro-gestures confirmed the format lets people be considerate.</li>
      </ul>
      
      <h2>Guidance for New Attendees</h2>
      <ol>
        <li><strong>Arrive early:</strong> Use the first ten minutes to settle in and chat with staff; it eases the nerves before the bell rings.</li>
        <li><strong>Plan two questions:</strong> Bring one playful question and one deeper question so the chat can evolve naturally.</li>
        <li><strong>Note how you feel:</strong> After each rotation, jot more than "yes" or "no". "Felt relaxed" or "Would like to continue in Cantonese" helps you choose intentional matches.</li>
        <li><strong>Follow up fast:</strong> When you receive a match email, suggest a cafe or a walk within 48 hours. Momentum counts.</li>
      </ol>
      
      <h2>Official Event Snapshot</h2>
      <ul>
        <li><strong>Host:</strong> Lounge Asia (500+ member community of Asian professionals in Brisbane).</li>
        <li><strong>Theme:</strong> Comfort and Romance-respectful, well-organised dating for Asian singles and allies.</li>
        <li><strong>Venue:</strong> The Stock Exchange Hotel, Level 2, Brisbane CBD.</li>
        <li><strong>Format:</strong> Five-minute rotations, digital Like/Super Like submissions, results sent the next day.</li>
        <li><strong>Group sizes:</strong> 24 guests per session to keep the conversations focused.</li>
        <li><strong>Dress code:</strong> Smart casual-think blazers with sneakers or dresses with a light jacket.</li>
        <li><strong>Price:</strong> AUD 50 + GST for men, complimentary for women (paid in advance via Stripe).</li>
      </ul>
      
      <h2>Be Part of the Next Round</h2>
      <p>If you're ready to explore dating in Brisbane with people who understand the nuances of Asian culture, Speed Dating Asia offers a considerate way to begin. Add your details below for first release tickets and updates on future themes.</p>
    `,
  },
  "best-brisbane-spots-asian-community": {
    title: "Best Brisbane Spots for the Asian Community",
    excerpt: "Venue scouting notes from Lounge Asia-where we hold socials, language exchanges, and casual follow-ups across Brisbane.",
    category: "Brisbane",
    date: "01/01/2025",
    readTime: "7 min read",
    image: "blog/brisbane/brisbane-hero.jpg",
    author: "Lounge Asia Team",
    content: `
      <p>Every International Meet Up and Speed Dating Asia round begins with a scouting trip. We walk through Brisbane with a notebook, checking lighting, background noise, and transport connections. These are the places we return to repeatedly because they help guests relax, keep conversations flowing, and encourage friendships long after the event ends.</p>
      
      <h2>Sunnybank - Comfort Food Central</h2>
      <p>Our team makes a habit of meeting here before every big event. We each spend twenty dollars in the Sunnybank Plaza food court, bring our favourite dishes to a shared table, and talk about how to welcome new arrivals who miss home. Bubble tea stands open late, and there is always a new Malaysian or Taiwanese stall to try. It is our top pick for informal post-event dinners.</p>
      
      <h2>Brisbane CBD - After-Work Friendly</h2>
      <p>The Stock Exchange Hotel (Level 2) is our go-to venue for both Speed Dating Asia and the International Meet Up. It is a five-minute walk from Central Station, the lighting is flattering, and the staff understand our need for quick table resets. Nearby, we recommend grabbing a debrief drink at Her Bar or a late-night ramen at Taro's if the conversation continues.</p>
      
      <h2>West End - Creative Mix</h2>
      <p>Saturday mornings at Davies Park Markets feel like Southeast Asia. You will find Vietnamese iced coffee, Filipino baked goods, and live music. Many guests arrange casual catch-ups here because it is easy to wander, snack, and keep chatting without spending much.</p>
      
      <h2>Fortitude Valley - Night-time Energy</h2>
      <p>When we need atmospheric photos and neon lights, Fortitude Valley delivers. Chinatown Mall stays lively past nine pm, and the laneways give plenty of backdrop options for those "we met at Lounge Asia" selfies. We avoid the rowdiest nights and stick to Thursdays or Sundays when the vibe is upbeat but comfortable.</p>
      
      <h2>Logistics Checklist We Always Use</h2>
      <ul>
        <li><strong>Public transport:</strong> No venue makes the list unless it sits within a five-minute walk of a train or bus stop.</li>
        <li><strong>Sound level:</strong> We test each spot with a decibel app to keep conversations around 60-65 dB-lively enough to feel social, quiet enough to hear accents clearly.</li>
        <li><strong>Lighting and seating:</strong> Warm-toned lighting and round tables work best. Harsh downlights or bar stools are a no from us.</li>
      </ul>
      
      <h2>Official Event Snapshot</h2>
      <ul>
        <li><strong>Host:</strong> Lounge Asia (500+ member community).</li>
        <li><strong>Event types:</strong> International Meet Up (language exchange), Speed Dating Asia (romance), ad-hoc brunch clubs.</li>
        <li><strong>Payment:</strong> Meet Ups are donation based; Speed Dating Asia tickets are prepaid.</li>
        <li><strong>Dress code:</strong> Smart casual-breathable fabrics for summer and layered outfits for winter evenings.</li>
      </ul>
      
      <h2>Explore Brisbane with Us</h2>
      <p>Whether you are planning your first Lounge Asia event or looking for ideas after a successful match, these locations keep proving themselves. Save the map, invite a new friend, and keep the conversation rolling.</p>
    `,
  },
  "melbourne-asian-scene-guide": {
    title: "Melbourne's Asian Scene: A Complete Guide",
    excerpt: "Scouting Melbourne ahead of our expansion-meet-ups, partner venues, and how we'll recreate Comfort & Romance.",
    category: "Melbourne",
    date: "28/12/2024",
    readTime: "8 min read",
    image: "blog/melbourne/melbourne-hero.png",
    author: "Lounge Asia Team",
    content: `
      <p>After settling our programmes in Brisbane, we began spending weekends in Melbourne to plan Lounge Asia's next chapter. We rode the tram before sunrise, tasted hawker snacks in Box Hill, and met with local partners who love building Asian community spaces. Here is the shortlist of spots that made us say, "Yes-Comfort and Romance can live here too."</p>
      
      <h2>Box Hill - Morning Energy</h2>
      <p>At six am Box Hill Central is already buzzing. Steam rises from bamboo baskets, the language switchboard jumps between Cantonese and English, and families line up for soy milk. It felt like the perfect setting for an early-morning language exchange. We are planning breakfast-style International Meet Ups here so guests can connect before work or weekend plans.</p>
      
      <h2>CBD & Chinatown - Evening Glow</h2>
      <p>Walk through the red gateway on Little Bourke Street at dusk and you instantly feel the romance. Our venue partners in the CBD understand that we need warm lighting, low music, and quick table resets for Speed Dating Asia. Post-event, the laneways offer cosy wine bars and dessert cafes for matches who want to continue their chat.</p>
      
      <h2>Glen Waverley - Families & Professionals Together</h2>
      <p>Kingsway is full of school pick-up traffic by day and lively dinners by night. Local HR managers told us they want events where young professionals and parents can mingle, so we are testing kid-friendly afternoon socials here. Expect spacious venues, pram access, and the best bubble waffles in town.</p>
      
      <h2>Clayton & Springvale - Academic Heartbeat</h2>
      <p>With Monash University at its core, Clayton overflows with researchers, founders, and students. Springvale's Vietnamese eateries reminded us of the night markets our community misses. We are designing theme nights here-think "Research Innovators" or "Grad Student Catch Ups"-to help newcomers build networks quickly.</p>
      
      <h2>Partnership Notes</h2>
      <ul>
        <li><strong>Local MCs:</strong> We are partnering with Melbourne-based bilingual hosts so the tone feels authentically local.</li>
        <li><strong>Hybrid events:</strong> Expect some sessions to link Brisbane and Melbourne online so both cities can mix.</li>
        <li><strong>Food collaborations:</strong> Several restaurateurs are crafting event-only menus-perfect for follow-up dates.</li>
      </ul>
      
      <h2>Official Event Snapshot</h2>
      <ul>
        <li><strong>Host:</strong> Lounge Asia (Brisbane headquarters, Melbourne launch slated for late 2025).</li>
        <li><strong>Theme:</strong> Comfort and Romance / Connecting hearts across Asian cultures.</li>
        <li><strong>Planned venues:</strong> CBD speakeasies, Box Hill cafes, Glen Waverley meeting rooms, and Springvale community spaces.</li>
        <li><strong>Pricing:</strong> Expected to mirror Brisbane-AUD 50 + GST for men, complimentary for women.</li>
        <li><strong>Registration:</strong> Interest list now open; QR check-in and digital matching will operate the same as Brisbane.</li>
      </ul>
      
      <h2>Join the Melbourne Interest List</h2>
      <p>Want first dibs when events go live? Add your details below and note "Melbourne" in the comments. We will invite you to pilot meet ups, venue tours, and the very first Speed Dating Asia session in the city.</p>
    `,
  },
  "tips-making-friends-asian-community": {
    title: "10 Tips for Making Friends in Australia's Asian Community",
    excerpt: "Ten lessons from our team and guests that turn a quiet weekend into lasting friendships in Brisbane.",
    category: "Tips",
    date: "20/12/2024",
    readTime: "7 min read",
    image: "blog/tips/tips-hero.jpg",
    author: "Lounge Asia Team",
    content: `
      <p>Before Lounge Asia existed, our weekends were quiet: long hours in the State Library, solo dinners, and endlessly scrolling social media. Years later, after meeting hundreds of international students, professionals, and new migrants, we distilled what actually helps people feel at home. Here are ten practical actions-tested by our team, Ayaka, Joon, and many others-that turn lonely weekends into meaningful friendships.</p>
      
      <h2>1. Give it more than one try</h2>
      <p>Ayaka almost skipped her second International Meet Up because she felt shy. On her third visit she recognised several faces, and that familiarity unlocked genuine conversation. Consistency builds trust.</p>
      
      <h2>2. Say hello to the host team</h2>
      <p>Letting the organisers know you are new means we can introduce you to people with similar interests or languages. Consider us your wingmates.</p>
      
      <h2>3. Ask collaborative questions</h2>
      <p>Instead of small talk, try "What helped you settle in Brisbane?" or "Which language are you practising at the moment?" You invite a story and offer one in return.</p>
      
      <h2>4. Share a quick task</h2>
      <p>Helping tidy chairs or stack cups at the end of an event feels minor, yet it opens the door to "Shall we grab a snack downstairs?" Shared effort lowers barriers.</p>
      
      <h2>5. Bring conversation prompts</h2>
      <p>Reuse the interest cards from Speed Dating Asia-favourite comfort food, go-to karaoke song, dream holiday. They work just as well for making friends.</p>
      
      <h2>6. Follow up within 48 hours</h2>
      <p>Send a quick message while the chat is still fresh: "Great meeting you-keen for bubble tea this Sunday?" Momentum shows you genuinely care.</p>
      
      <h2>7. Introduce your comfort food</h2>
      <p>Organise a low-key potluck or cook a dish that reminds you of home. Sharing recipes creates quick nostalgia bonds.</p>
      
      <h2>8. Suggest ideas, don't just attend</h2>
      <p>Many of our favourite events came from attendee suggestions-city walks, dumpling crawls, film nights. Pitch your idea; we will help make it happen.</p>
      
      <h2>9. Use social media as a promise, not a scroll</h2>
      <p>Join the Lounge Asia Facebook group and post something actionable: "Heading to Sunnybank Markets on Saturday-anyone free?" Online invitations lead to offline memories.</p>
      
      <h2>10. Be the person who notices newcomers</h2>
      <p>Once you feel at home, be the one to wave others over. Your simple "Sit with us" keeps the community warm.</p>
      
      <h2>Official Event Snapshot</h2>
      <ul>
        <li><strong>Host:</strong> Lounge Asia (500+ member community).</li>
        <li><strong>Main gatherings:</strong> International Meet Up for language exchange, Speed Dating Asia for romance, and casual pop-up socials.</li>
        <li><strong>Access:</strong> QR check-in, smart casual dress code, donation box for community events.</li>
      </ul>
      
      <h2>Keep the Momentum</h2>
      <p>Friendship thrives with intentionality. Register below to receive event updates, small-group invites, and conversation guides straight to your inbox.</p>
    `,
  },
};

const toIsoDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug] : null;
  const baseUrl = "https://www.loungeasia.com.au/speed-dating/lp/blog";
  const canonicalUrl = post ? `${baseUrl}/${slug}` : `${baseUrl}/`;
  const metaTitle = post ? `${post.title} | Lounge Asia Blog` : "Lounge Asia Blog";
  const metaDescription = post?.excerpt ?? "Discover Lounge Asia event stories, dating insights, and lifestyle tips for Brisbane's Asian community.";
  const withBase = (path: string | undefined) =>
    path && !path.startsWith("http") ? `${import.meta.env.BASE_URL}${path}` : path || "";
  const absoluteOgImage = post?.image?.startsWith("http")
    ? post.image
    : post?.image
      ? `https://www.loungeasia.com.au/speed-dating/lp/${post.image}`
      : "https://www.loungeasia.com.au/assets/og-image.jpg";
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Get all post slugs for navigation
  const postSlugs = Object.keys(blogPostsData);
  const currentIndex = slug ? postSlugs.indexOf(slug) : -1;
  const prevSlug = currentIndex > 0 ? postSlugs[currentIndex - 1] : undefined;
  const nextSlug = currentIndex < postSlugs.length - 1 ? postSlugs[currentIndex + 1] : undefined;

  const prevArticle = prevSlug ? {
    slug: prevSlug,
    title: blogPostsData[prevSlug].title,
    category: blogPostsData[prevSlug].category
  } : undefined;

  const nextArticle = nextSlug ? {
    slug: nextSlug,
    title: blogPostsData[nextSlug].title,
    category: blogPostsData[nextSlug].category
  } : undefined;

  // Add IDs to headings in content
  const articleJsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Organization",
          "name": "Lounge Asia"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Lounge Asia",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.loungeasia.com.au/assets/logo.png"
          }
        },
        "image": absoluteOgImage,
        "mainEntityOfPage": canonicalUrl,
        "datePublished": toIsoDate(post.date),
        "dateModified": toIsoDate(post.date),
        "inLanguage": "en",
        "url": canonicalUrl
      }
    : null;

  const addHeadingIds = (content: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const headings = tempDiv.querySelectorAll("h2, h3");
    
    headings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
    });
    
    return tempDiv.innerHTML;
  };

  // Swipe gesture handling
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeThreshold = 100;
      const diff = touchStartX.current - touchEndX.current;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && nextSlug) {
          // Swipe left - next article
          window.location.href = `/blog/${nextSlug}`;
        } else if (diff < 0 && prevSlug) {
          // Swipe right - previous article
          window.location.href = `/blog/${prevSlug}`;
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSlug, prevSlug]);


  if (!post) {
    return (
      <>
        <Helmet>
          <title>記事が見つかりません | Lounge Asia Blog</title>
          <meta name="description" content="The article you requested could not be found on Lounge Asia Blog." />
          <meta name="robots" content="noindex,follow" />
          <link rel="canonical" href={`${baseUrl}/`} />
        </Helmet>
        <div className="min-h-screen bg-gray-950 text-slate-100">
          <Navigation />
        <div className="container mx-auto max-w-4xl px-4 pt-32 pb-20 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Article Not Found</h1>
          <p className="mb-8 text-slate-300">The article you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
          <Link to="/blog" className="inline-block">
            <Button variant="outline" className="border-yellow-400/70 bg-yellow-400/15 text-yellow-100 hover:bg-yellow-400 hover:text-gray-950">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
      </>
    );
  }

  const processedContent = post ? addHeadingIds(post.content) : "";
  const currentUrl = window.location.href;
  const heroImage = withBase(post?.image) || "https://www.loungeasia.com.au/assets/og-image.jpg";

  return (
    <>
            <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={absoluteOgImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={absoluteOgImage} />
        {articleJsonLd && (
          <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        )}
      </Helmet>
      <div className="min-h-screen bg-gray-950 text-slate-100">
        <Navigation />

        {/* Sticky Social Share Buttons */}
        <SocialShare url={currentUrl} title={post.title} variant="sticky" />
      
        {/* Hero Image */}
        <div className="relative pt-16">
          <AspectRatio
            ratio={16 / 9}
            className="overflow-hidden rounded-b-[2.5rem] border border-white/5 bg-gray-900/60 shadow-[0_30px_80px_rgba(8,12,24,0.6)]"
          >
            <img
              src={heroImage}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/60 to-transparent" />
          </AspectRatio>
        </div>

        {/* Article Content */}
        <div className="relative z-10 -mt-32 container mx-auto px-4">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:gap-12 lg:items-start">
          <article className="flex-1 max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-[0_25px_55px_rgba(8,12,28,0.5)] md:p-12 animate-fade-in-up">
              {/* Breadcrumb */}
              <Breadcrumb category={post.category} title={post.title} />

              {/* Category Badge */}
              <Badge className="mb-4 border border-yellow-300/50 bg-yellow-400/15 text-yellow-100">
                {post.category}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span>{post.author}</span>
              </div>

              {/* Social Proof */}
              <div className="mb-6">
                <SocialProof slug={slug || ""} />
              </div>

              {/* Share Buttons */}
              <div className="mb-8 pb-8 border-b">
                <SocialShare url={currentUrl} title={post.title} />
              </div>

              {/* Article Body */}
              <div
                className="prose prose-lg prose-invert max-w-none
                  prose-headings:font-bold prose-headings:text-white
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-slate-200 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-yellow-200 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-li:text-slate-200 prose-li:mb-2
                  prose-img:rounded-lg prose-img:border prose-img:border-white/10"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              <BlogWaitlistCTA />

              {/* Article Navigation */}
              <ArticleNavigation prevArticle={prevArticle} nextArticle={nextArticle} />

            </div>

            {/* Related Posts */}
            <div className="mt-12 mb-20">
              <h2 className="mb-6 text-2xl font-bold text-white">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(blogPostsData)
                  .filter(([key, relatedPost]) => 
                    key !== slug && relatedPost.category === post.category
                  )
                  .slice(0, 2)
                  .concat(
                    Object.entries(blogPostsData)
                      .filter(([key, relatedPost]) => 
                        key !== slug && relatedPost.category !== post.category
                      )
                      .slice(0, 2 - Object.entries(blogPostsData)
                        .filter(([key, relatedPost]) => 
                          key !== slug && relatedPost.category === post.category
                        )
                        .length
                      )
                  )
                  .slice(0, 2)
                  .map(([key, relatedPost]) => (
                    <Link 
                      key={key} 
                      to={`/blog/${key}`}
                      className="group"
                    >
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-gray-900/70 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-yellow-400/40">
                        <AspectRatio ratio={16 / 9} className="overflow-hidden">
                          <img
                            src={withBase(relatedPost.image)}
                            alt={relatedPost.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </AspectRatio>
                        <div className="p-6">
                          <Badge className="mb-3 border border-yellow-300/50 bg-yellow-400/15 text-yellow-100">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-yellow-200">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </article>

          {/* Table of Contents - Desktop only */}
          <TableOfContents content={processedContent} />
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogPost;

