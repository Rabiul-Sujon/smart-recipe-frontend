"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import api from "@/lib/axios";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeCardSkeleton from "@/components/recipe/RecipeCardSkeleton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cuisines = ["All", "Italian", "Indian", "Asian", "American", "Desserts"];
const sortOptions = [
  { label: "Newest", value: "createdAt" },
  { label: "Top Rated", value: "rating" },
  { label: "Cook Time", value: "cookTime" },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["recipes", search, cuisine, sort, page],
    queryFn: async () => {
      const res = await api.get("/recipes", {
        params: { search, cuisine: cuisine === "All" ? "" : cuisine, sort, page, limit: 8 },
      });
      return res.data;
    },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Explore Recipes</h1>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <select
            value={cuisine}
            onChange={(e) => { setCuisine(e.target.value); setPage(1); }}
            className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {cuisines.map((c) => (
              <option key={c} value={c === "All" ? "" : c}>{c}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {isLoading
            ? [...Array(8)].map((_, i) => <RecipeCardSkeleton key={i} />)
            : data?.recipes?.map((recipe: any) => (
                <RecipeCard key={recipe._id} {...recipe} />
              ))}
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {[...Array(data.totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-lg font-medium ${
                  page === i + 1
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}