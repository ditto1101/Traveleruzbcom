import { HeroSection } from "../components/HeroSection";
import { PopularDestinations } from "../components/PopularDestinations";
import { FeaturedTours } from "../components/FeaturedTours";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { UzbekistanHighlights } from "../components/UzbekistanHighlights";
import { Testimonials } from "../components/Testimonials";
import { BlogPreview } from "../components/BlogPreview";
import { NewsletterCTA } from "../components/NewsletterCTA";

export function Home() {
  return (
    <main>
      {/* 1. Hero — full viewport, parallax bg, search bar */}
      <HeroSection />

      {/* 2. Popular Destinations — horizontal scrollable strip */}
      <PopularDestinations />

      {/* 3. Featured Tours — 3-column signature tours */}
      <FeaturedTours />

      {/* 4. Why Choose Us — value propositions */}
      <WhyChooseUs />

      {/* 5. Uzbekistan Highlights — editorial split layout */}
      <UzbekistanHighlights />

      {/* 6. Testimonials — dark blue carousel */}
      <Testimonials />

      {/* 7. Blog Preview — 3 article cards */}
      <BlogPreview />

      {/* 8. Newsletter / Contact CTA — golden gradient banner */}
      <NewsletterCTA />
    </main>
  );
}
