"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Farhana Akter",
    role: "Home Cook",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    quote: "The AI assistant helped me use up leftover vegetables instead of throwing them out.",
  },
  {
    name: "Tanvir Hasan",
    role: "Food Blogger",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    quote: "I found recipes matching exactly what was in my fridge within seconds.",
  },
  {
    name: "Nusrat Jahan",
    role: "Student",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
    quote: "Quick, budget-friendly meal ideas that actually fit my schedule.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-14 text-center"
      >
        What our users say
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6"
          >
            <div className="flex gap-1 mb-4 text-orange-500">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-700 mb-6">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <Image src={t.image} alt={t.name} width={40} height={40} className="rounded-full object-cover" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}