"use client";
import { motion } from "framer-motion";
import { Sparkles, Search, ChefHat, Clock } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Recipe Assistant",
    description: "Tell us what's in your kitchen and get instant, personalized recipe ideas.",
  },
  {
    icon: Search,
    title: "Smart Search & Filters",
    description: "Find recipes by cuisine, cook time, or ingredients in seconds.",
  },
  {
    icon: ChefHat,
    title: "Share Your Recipes",
    description: "Add your own creations and build your personal recipe collection.",
  },
  {
    icon: Clock,
    title: "Quick Meal Planning",
    description: "Get recommendations that fit your schedule and taste preferences.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Everything you need to cook better
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          From AI-powered suggestions to a full recipe library, SmartRecipe helps you decide what's for dinner.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-orange-50 rounded-2xl p-6 border border-orange-100"
          >
            <feature.icon className="text-orange-600 mb-4" size={32} />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}