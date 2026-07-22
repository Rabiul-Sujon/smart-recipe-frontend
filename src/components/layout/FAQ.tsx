"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does the AI recipe assistant work?",
    answer:
      "Tell it what ingredients you have or what you're craving, and it searches our recipe database in real time to suggest matching dishes, adapting based on your follow-up questions.",
  },
  {
    question: "Is SmartRecipe free to use?",
    answer: "Yes, browsing recipes and using the AI assistant is completely free.",
  },
  {
    question: "Can I add my own recipes?",
    answer: "Yes, once logged in you can add, manage, and delete your own recipes anytime.",
  },
  {
    question: "Do I need an account to search recipes?",
    answer: "No, browsing and viewing recipe details is public. An account is only needed to add recipes or chat with the AI assistant.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center"
      >
        Frequently asked questions
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-5 text-left font-medium text-gray-900 hover:bg-gray-50"
            >
              {faq.question}
              <ChevronDown
                className={`transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                size={18}
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}