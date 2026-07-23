import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChefHat, Users, Sparkles, Heart } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Recipes Shared", value: "2,400+" },
    { label: "Active Cooks", value: "800+" },
    { label: "Cuisines Covered", value: "30+" },
    { label: "AI Suggestions Given", value: "15,000+" },
  ];

  const values = [
    {
      icon: ChefHat,
      title: "Made for Real Cooks",
      description:
        "Whether you're a beginner or a seasoned chef, our platform adapts to your skill level and taste.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Discovery",
      description:
        "Our AI assistant helps you find recipes, suggests substitutions, and answers cooking questions in real time.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Every recipe is shared by real people. Rate, review, and build your own collection over time.",
    },
    {
      icon: Heart,
      title: "Built with Care",
      description:
        "We focus on clean design and a smooth experience so cooking inspiration is always one click away.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-600 text-lg">
            We're building a smarter way to discover, share, and cook great food —
            combining a passionate community with AI that actually understands the kitchen.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
            >
              <p className="text-2xl font-bold text-orange-600 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Story</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            This project started as a simple idea: cooking shouldn't require flipping
            through ten tabs to find one good recipe. By pairing a clean listing
            experience with an AI assistant that actually knows the catalog, we wanted
            to make finding your next meal feel effortless.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}