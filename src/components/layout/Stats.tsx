"use client";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

const data = [
  { name: "Recipes", value: 500 },
  { name: "Cuisines", value: 50 },
  { name: "Meals Planned", value: 10000 },
  { name: "Active Users", value: 1200 },
];

const colors = ["#ea580c", "#f97316", "#fb923c", "#fdba74"];

export default function Stats() {
  return (
    <section className="py-16 px-6 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
        >
          SmartRecipe by the numbers
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="h-72"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={colors[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}