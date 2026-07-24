/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeCardSkeleton from "@/components/recipe/RecipeCardSkeleton";
import api from "@/lib/axios";

export default function RecommendationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const res = await api.get("/ai/recommendations");
      return res.data;
    },
  });

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            Powered by Groq AI
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Recommended For You</h1>
          <p className="text-gray-500 mt-2">
            Based on your browsing history, our AI picked these recipes just for you.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <RecipeCardSkeleton key={i} />)}
          </div>
        ) : data?.recommended?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">
              Browse some recipes first — our AI will learn your preferences and make personalized suggestions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.recommended?.map((recipe: any) => (
              <RecipeCard key={recipe._id} {...recipe} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </ProtectedRoute>
  );
}