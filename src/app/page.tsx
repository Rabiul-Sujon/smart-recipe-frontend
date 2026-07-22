import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Features from "@/components/layout/Features";
import Categories from "@/components/layout/Categories";
import Stats from "@/components/layout/Stats";
import Testimonials from "@/components/layout/Testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <Stats />
      <Testimonials />
     
    </main>
  );
}