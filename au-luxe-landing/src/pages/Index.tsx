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
  return (
    <>
      <Helmet>
        <title>Lounge Asia Speed Dating Brisbane | Meet Asian Singles</title>
        <meta
          name="description"
          content="Meet Brisbane's Asian singles in one unforgettable evening. Verified guests, balanced pairings, and instant match results. Join the waitlist today!"
        />
        <meta property="og:title" content="Lounge Asia Speed Dating Brisbane | Meet Asian Singles" />
        <meta
          property="og:description"
          content="Meet Brisbane's Asian singles in one unforgettable evening. Verified guests, balanced pairings, and instant match results."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main className="min-h-screen">
        <Hero />
        <CommunityTrust />
        <ValueProposition />
        <HowItWorks />
        <Testimonials />
        <WaitlistForm />
        <FAQ />
        <Footer />
      </main>
    </>
  );
};

export default Index;
