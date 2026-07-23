/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/axios";

export default function AddRecipePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    cuisine: "",
    cookTime: "",
    ingredients: "",
    steps: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/recipes", {
        title: form.title,
        description: form.description,
        image: form.image,
        cuisine: form.cuisine,
        cookTime: Number(form.cookTime),
        ingredients: form.ingredients.split("\n").filter(Boolean),
        steps: form.steps.split("\n").filter(Boolean),
      });
      router.push("/items/manage");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Recipe</h1>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. Spaghetti Carbonara"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <input
              name="description"
              required
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Brief description of the dish"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              name="image"
              required
              value={form.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
              <select
                name="cuisine"
                required
                value={form.cuisine}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select cuisine</option>
                <option>Italian</option>
                <option>Indian</option>
                <option>Asian</option>
                <option>American</option>
                <option>Desserts</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time (minutes)</label>
              <input
                name="cookTime"
                type="number"
                required
                min="1"
                value={form.cookTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. 30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients <span className="text-gray-400 font-normal">(one per line)</span>
            </label>
            <textarea
              name="ingredients"
              required
              rows={5}
              value={form.ingredients}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder={"2 cups flour\n1 cup sugar\n3 eggs"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Steps <span className="text-gray-400 font-normal">(one per line)</span>
            </label>
            <textarea
              name="steps"
              required
              rows={6}
              value={form.steps}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder={"Preheat oven to 180°C\nMix dry ingredients\nAdd wet ingredients and stir"}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Adding Recipe..." : "Add Recipe"}
          </button>
        </form>
      </main>
      <Footer />
    </ProtectedRoute>
  );
}