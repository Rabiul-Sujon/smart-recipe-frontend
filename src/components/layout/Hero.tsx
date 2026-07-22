"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[65vh] min-h-[500px] flex items-center overflow-hidden pt-16">
      <Image
        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000"
        alt="Fresh cooking ingredients"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-4 max-w-2xl"
        >
          Cook smarter with what you already have
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 max-w-xl text-gray-200"
        >
          Discover recipes, get AI-powered suggestions from your ingredients, and plan meals that fit your taste.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4"
        >
          <Link
            href="/explore"
            className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Explore Recipes
          </Link>
          <Link
            href="/ai-chat"
            className="bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Ask AI Assistant
          </Link>
        </motion.div>
      </div>
    </section>
  );
}