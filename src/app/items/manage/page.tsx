/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Eye, Plus } from "lucide-react";
import api from "@/lib/axios";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function ManageRecipesPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["myRecipes"],
    queryFn: async () => {
      const res = await api.get("/recipes/mine");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/recipes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRecipes"] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
          <Link
            href="/items/add"
            className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            <Plus size={18} /> Add Recipe
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
          </div>
        ) : data?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">You haven't added any recipes yet.</p>
            <Link href="/items/add" className="text-orange-600 font-medium hover:underline">
              Add your first recipe
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Recipe</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Cuisine</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Cook Time</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Rating</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.map((recipe: any) => (
                  <tr key={recipe._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                        </div>
                        <span className="font-medium text-gray-900 line-clamp-1">{recipe.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{recipe.cuisine}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{recipe.cookTime} min</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">⭐ {recipe.rating.toFixed(1)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/recipes/${recipe._id}`}
                          className="text-gray-500 hover:text-orange-600 transition-colors"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(recipe._id)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </ProtectedRoute>
  );
}