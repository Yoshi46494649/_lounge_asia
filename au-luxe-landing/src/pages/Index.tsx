import { Hero } from "@/components/Hero";
import { CommunityTrust } from "@/components/CommunityTrust";
import { ValueProposition } from "@/components/ValueProposition";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  const canonicalUrl = "https://www.loungeasia.com.au/speed-dating/lp/";
  const socialImage = "https://www.loungeasia.com.au/speed-dating/images/og-speed-dating.jpg";

  return (
    <>
      <Helmet>
        <title>Lounge Asia Speed Dating Brisbane | Meet Asian Singles</title>
        <meta
          name="description"
          content="Meet Brisbane's Asian singles in one unforgettable evening. Verified guests, balanced pairings, and instant match results. Join the waitlist today!"
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Lounge Asia Speed Dating Brisbane | Meet Asian Singles" />
        <meta
          property="og:description"
          content="Meet Brisbane's Asian singles in one unforgettable evening. Verified guests, balanced pairings, and instant match results."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lounge Asia Speed Dating Brisbane | Meet Asian Singles" />
        <meta
          name="twitter:description"
          content="Meet Brisbane's Asian singles in one unforgettable evening. Verified guests, balanced pairings, and instant match results."
        />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>

      <main className="min-h-screen">
        <Hero />
        <CommunityTrust />
        <ValueProposition />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <WaitlistForm />
        <Footer />
      </main>
    </>
  );
};

export default Index;
