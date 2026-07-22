import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Features from "@/components/layout/Features";
import Categories from "@/components/layout/Categories";
import Stats from "@/components/layout/Stats";
import Testimonials from "@/components/layout/Testimonials";
import FAQ from "@/components/layout/FAQ";
import CTA from "@/components/layout/CTA";
import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
     
    </main>
  );
}