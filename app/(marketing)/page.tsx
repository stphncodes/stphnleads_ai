import { Hero } from "@/components/landing/hero";
import { Trusted } from "@/components/landing/trusted";
import { Features } from "@/components/landing/features";
import { Showcase } from "@/components/landing/showcase";
import { Testimonials } from "@/components/landing/testimonials";
import { CtaFooter } from "@/components/landing/cta-footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trusted />
      <Features />
      <Showcase />
      <Testimonials />
      <CtaFooter />
    </>
  );
}
