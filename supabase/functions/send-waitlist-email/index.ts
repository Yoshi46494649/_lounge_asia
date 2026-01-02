// supabase/functions/send-waitlist-email/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "no-reply@loungeasia.com.au";
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") || "";

serve(async (req) => {
  try {
    // --- Database webhook requests must include the shared secret header ---
    const headerSecret = req.headers.get("x-waitlist-secret") || "";
    if (!WEBHOOK_SECRET || headerSecret !== WEBHOOK_SECRET) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401
      });
    }

    const payload = await req.json();
    const rec = payload?.record ?? payload?.data?.record ?? payload;
    const email = rec?.email;
    if (!email) {
      return new Response(JSON.stringify({ ok: true, note: "no email field" }), {
        status: 200
      });
    }

    const html = `
      <p>こんにちは！</p>
      <p>Speed Dating Asia にご登録ありがとうございます。イベントや参加方法の最新情報はこのメールにお送りします。</p>
      <p>配信停止をご希望の際は本メールに返信してください。</p>
      <p>— Speed Dating Asia 運営</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: \`Bearer \${RESEND_API_KEY}\`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: "ご登録ありがとうございます（Speed Dating Asia）",
        html
      })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend send error:", text);
      return new Response(JSON.stringify({ ok: false, error: text }), {
        status: 500
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500
    });
  }
});
