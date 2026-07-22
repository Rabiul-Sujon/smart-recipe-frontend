"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-orange-600">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to cook something new?
        </h2>
        <p className="text-orange-100 mb-8 text-lg">
          Join SmartRecipe and let AI help you decide what's for dinner tonight.
        </p>
        <Link
          href="/register"
          className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
        >
          Get Started Free
        </Link>
      </motion.div>
    </section>
  );
}