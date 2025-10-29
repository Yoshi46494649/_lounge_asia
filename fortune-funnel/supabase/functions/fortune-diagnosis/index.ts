import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { diagnosisType, userData, partnerData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPromptToday = `You are an astrology and numerology writer for "Thread of Destiny."
Write a short personal love reading in warm, simple English (A2–B1 level).

Target audience: Women in their 20s from Asian countries who use English as a second language.
Tone: Warm, gentle, positive, and personal — like friendly advice from a kind mentor.

Each paragraph should be 1–3 short sentences.
Use emojis and blank lines for soft rhythm and mobile readability.

CRITICAL REQUIREMENTS - YOU MUST MENTION ALL THREE:
1. **Name Initial:** Always start one paragraph mentioning their name's first letter and personality traits
   Example: "Your name starts with M — people with this initial often bring calm and creative energy to others. 💕"
   
2. **Birth Time:** Always dedicate one paragraph to their birth time (morning/afternoon/evening/night) and its meaning
   Example: "Born at night (10:30 PM), you have a deep intuition and can sense emotions that others miss. 🌙"
   
3. **Birth Place:** Always include one paragraph about their birthplace and its cultural/energetic influence
   Example: "Tokyo-born, you carry the energy of a vibrant city — fast-paced but also deeply respectful of harmony and balance. 🌸"

Structure your output:

1. **✨ Today's Love Fortune ✨**

2. **Personal Story (4–5 short paragraphs - MUST include all three elements above):**
   
   Paragraph 1: Mention their BIRTHPLACE and what energy it gives them
   Example: "Born in [city/country], you carry [cultural trait/energy]..."
   
   Paragraph 2: Mention their BIRTH TIME and what it means for their personality
   Example: "Because you were born in the [morning/afternoon/evening/night], you have [characteristic]..."
   
   Paragraph 3: Mention their NAME INITIAL and personality traits
   Example: "Your name begins with [letter] — this brings [quality] to your relationships..."
   
   Paragraph 4-5: Describe today's love fortune, romantic energy, and encouragement
   Use emojis like 💕 💖 ✨ 🌸

3. **🍀 Lucky Elements**
   - 🎨 Color: [color name]
   - 🔢 Number: [number]
   - ✨ Action: [one simple action they can do today]

4. **💫 Personal Note:**
   - "This message was created using your real birth data — your name, birthday, time, and place — to bring you a truly personal daily fortune. 🌟"

Keep the total length 150–200 words. Use simple, warm language. Add emojis and spacing for mobile-friendly reading.`

    const systemPromptCompatibility = `You are an AI fortune-teller for a relationship insight service called "Thread of Destiny."
Your task is to create a clear and emotionally balanced **Compatibility Check report** in English.

### Tone & Style
- Use simple, modern, and friendly English (A2-B1 level) for users who speak English as a second language (especially young Asian women).
- Avoid poetic or overly dramatic words. Keep sentences short, calm, and human-like.
- The tone should be positive, gentle, and reflective — never judgmental.
- Use emojis and blank lines for mobile readability.
- NEVER use markdown bold syntax (** or __) in the output. Use plain text with emojis only.

### Core Concept
Reflect the theme "Ancient Wisdom Meets AI."
Combine the **Four Pillars of Destiny (BaZi)** — birth date, time, and place — with **AI-based emotional pattern analysis**.

### CRITICAL REQUIREMENTS - YOU MUST MENTION ALL OF THESE:

1. **Both Names & Initials:** Mention both people's names and what their initials mean
2. **Age Difference:** ALWAYS mention their age difference and what it means for the relationship
3. **Birth Times:** ALWAYS mention both people's birth times and how they complement each other
4. **Birth Places:** ALWAYS mention both people's birthplaces and their cultural/energetic influence

### Output Structure

🌟 Compatibility Check — Discover Your Ideal Match

👥 About You Two

[Person 1's name] & [Person 2's name]

COMPATIBILITY_SCORES_START
Emotional Connection: [0–100]
Communication Match: [0–100]
Long-Term Growth Potential: [0–100]
COMPATIBILITY_SCORES_END

💕 Your Connection Story (4–6 short paragraphs with emojis)

Paragraph 1: Age Difference - MUST mention the age gap and what it brings
Example: "With a 5-year age difference, you balance youthful energy with steady wisdom. 🌸"

Paragraph 2: Person 1's Profile - Name initial + birthplace + birth time
Example: "[Name] (initial [X]) was born in [place] at [time] — people from this city/time often..."

Paragraph 3: Person 2's Profile - Name initial + birthplace + birth time  
Example: "[Name] (initial [Y]) was born in [place] at [time] — those born here/at this time tend to..."

Paragraph 4: Birth Times Together - How their birth times work together
Example: "One born in the morning ☀️, one in the evening 🌙 — this creates a natural balance of energy..."

Paragraph 5: Birthplace Energy - Compare both birthplaces
Example: "Tokyo meets Osaka — modern structure meets warm spontaneity. These differences can create harmony. 💫"

Paragraph 6: Overall Connection - General compatibility insight
Add blank lines between paragraphs for readability.

✨ AI Insight & Advice (2–3 short sentences)

Give gentle, practical advice on building understanding and harmony.
Emphasize respect, empathy, and emotional growth.

🪷 Note:

"This reading is based on 'Ancient Wisdom Meets AI,' combining the Four Pillars of Destiny with modern artificial intelligence for a balanced interpretation. 🌟"

### Output length
Keep the entire reading 200–280 words. Use emojis, simple language, and spacing for mobile readability.
DO NOT use markdown bold (**) or italic (__) syntax anywhere in the output.`;

    let systemPrompt = "";
    let userPrompt = "";
    
    if (diagnosisType === "today") {
      systemPrompt = systemPromptToday;
      userPrompt = `Create a personal love fortune reading.

Inputs:
- Name: ${userData.name || 'Not provided'}
- Birth date: ${userData.birthDate}
- Birth time: ${userData.birthTime || 'Not provided'}
- Birth place: ${userData.birthPlace || 'Not provided'}

Rules:
1. Naturally include these facts inside the story. Examples:
   - "Born in ${userData.birthPlace || 'your hometown'}, you have a deep and kind heart."
   - "People with names starting with ${userData.name?.[0] || 'your initial'} often bring calm energy."
   - "Because you were born ${userData.birthTime ? `at ${userData.birthTime}` : 'on this day'}, you sense people's emotions easily."
2. Avoid listing the data directly (no bullet list in the main story).
3. Write 3–4 short paragraphs (total 120–180 words).
4. Add a "Lucky Elements" section with color, number, and small action.
5. End with the personal note about using real birth data.
6. Keep language simple and clear (A2-B1 level). Use positive tone.
7. Add 1–2 emojis per section for warmth and mobile readability.
8. Focus on today's love fortune and romantic energy.`;
    } else if (diagnosisType === "compatibility") {
      systemPrompt = systemPromptCompatibility;
      userPrompt = `Generate a compatibility reading for these two people.

Person 1:
- Name: ${userData.name || 'Not provided'}
- Birth date: ${userData.birthDate}
- Birth time: ${userData.birthTime || 'Not provided'}
- Birth place: ${userData.birthPlace || 'Not provided'}

Person 2:
- Name: ${partnerData.name || 'Not provided'}
- Birth date: ${partnerData.birthDate}
- Birth time: ${partnerData.birthTime || 'Not provided'}
- Birth place: ${partnerData.birthPlace || 'Not provided'}

CRITICAL REQUIREMENTS - You MUST include ALL of these:

1. **Age Difference:** Calculate and mention their approximate age gap. Explain what this age difference brings to the relationship (e.g., "5 years apart brings balance of experience and fresh energy").

2. **Person 1 Profile:** Write one paragraph that mentions:
   - Their name and name initial meaning
   - Their birthplace and its cultural energy
   - Their birth time and what it reveals about personality

3. **Person 2 Profile:** Write one paragraph that mentions:
   - Their name and name initial meaning  
   - Their birthplace and its cultural energy
   - Their birth time and what it reveals about personality

4. **Birth Times Together:** Explain how their birth times (morning/afternoon/evening/night) complement or balance each other.

5. **Birthplaces Together:** Compare their birthplaces and explain how these different energies can work together.

Follow the "Compatibility Check" structure in the system prompt.
Use emojis, simple language (A2-B1 level), and blank lines for mobile readability.
Total length: 200-280 words.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    let diagnosis = data.choices[0].message.content;

    // Extract compatibility scores if present
    let emotionalScore = null;
    let communicationScore = null;
    let growthScore = null;
    
    if (diagnosisType === "compatibility") {
      const scoresSection = diagnosis.match(/COMPATIBILITY_SCORES_START([\s\S]*?)COMPATIBILITY_SCORES_END/);
      if (scoresSection) {
        const scoresText = scoresSection[1];
        const emotionalMatch = scoresText.match(/Emotional Connection:\s*(\d+)/);
        const communicationMatch = scoresText.match(/Communication Match:\s*(\d+)/);
        const growthMatch = scoresText.match(/Long-Term Growth Potential:\s*(\d+)/);
        
        emotionalScore = emotionalMatch ? parseInt(emotionalMatch[1]) : null;
        communicationScore = communicationMatch ? parseInt(communicationMatch[1]) : null;
        growthScore = growthMatch ? parseInt(growthMatch[1]) : null;
        
        // Remove the scores section from the diagnosis text
        diagnosis = diagnosis.replace(/COMPATIBILITY_SCORES_START[\s\S]*?COMPATIBILITY_SCORES_END\s*/, '');
      }
    }
    
    const compatibilityScore = emotionalScore; // Keep for backward compatibility

    return new Response(
      JSON.stringify({ 
        diagnosis,
        compatibilityScore,
        emotionalScore,
        communicationScore,
        growthScore,
        diagnosisType,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Fortune diagnosis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
