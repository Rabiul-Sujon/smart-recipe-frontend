"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Star, ChefHat, ArrowLeft } from "lucide-react";
import api from "@/lib/axios";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecipeCard from "@/components/recipe/RecipeCard";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function RecipeDetailsPage() {
  const { id } = useParams();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const res = await api.get(`/recipes/${id}`);
      return res.data;
    },
  });

  const { user } = useAuth();
  useEffect(() => {
  if (recipe && user) {
    api.post("/ai/interact", {
      recipeId: recipe._id,
      cuisine: recipe.cuisine,
      action: "view",
    }).catch(() => {});
  }
}, [recipe, user]);




  const { data: related } = useQuery({
    queryKey: ["related", recipe?.cuisine],
    queryFn: async () => {
      const res = await api.get("/recipes", {
        params: { cuisine: recipe.cuisine, limit: 4 },
      });
      return res.data;
    },
    enabled: !!recipe?.cuisine,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
        </div>
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <p className="text-gray-500">Recipe not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16">

        {/* Hero Image */}
        <div className="relative h-72 md:h-96 w-full">
          <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-6 left-6 text-white">
            <span className="bg-orange-600 text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
              {recipe.cuisine}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold">{recipe.title}</h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 mt-10">

          {/* Back link */}
          <Link href="/explore" className="flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-8 text-sm">
            <ArrowLeft size={16} /> Back to Explore
          </Link>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} className="text-orange-500" />
              <span>{recipe.cookTime} minutes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star size={18} className="text-orange-500" fill="currentColor" />
              <span>{recipe.rating.toFixed(1)} rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ChefHat size={18} className="text-orange-500" />
              <span>By {recipe.createdBy?.name || "SmartRecipe"}</span>
            </div>
          </div>

          {/* Description */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Overview</h2>
            <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
          </section>

          <div className="grid md:grid-cols-2 gap-10 mb-12">

            {/* Ingredients */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </section>

            {/* Steps */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.steps.map((step: string, i: number) => (
                  <li key={i} className="flex gap-4 text-gray-700">
                    <span className="w-7 h-7 rounded-full bg-orange-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Related Recipes */}
          {related?.recipes?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Related Recipes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.recipes
                  .filter((r: any) => r._id !== id)
                  .slice(0, 4)
                  .map((r: any) => (
                    <RecipeCard key={r._id} {...r} />
                  ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}