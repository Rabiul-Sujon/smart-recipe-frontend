"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  { name: "Italian", image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=600" },
  { name: "Indian", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600" },
  { name: "Asian", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600" },
  { name: "Desserts", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600" },
];

export default function Categories() {
  return (
    <section className="py-20 px-6 bg-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center"
        >
          Browse by cuisine
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/explore?cuisine=${cat.name}`} className="group block relative h-56 rounded-2xl overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <span className="absolute bottom-4 left-4 text-white font-semibold text-xl">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}