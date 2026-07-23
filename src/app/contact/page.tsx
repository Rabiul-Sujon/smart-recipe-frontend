/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import api from "@/lib/axios";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await api.post("/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@recipehub.com" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Location", value: "Remote / Worldwide" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 text-lg">
            Questions, feedback, or ideas for the platform? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="font-medium text-gray-900">{item.value}</p>
                </div>
              );
            })}
          </div>

          <div className="md:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              {error && (
                <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-600 text-sm rounded-lg p-3">
                  Your message has been sent. We'll get back to you soon.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}