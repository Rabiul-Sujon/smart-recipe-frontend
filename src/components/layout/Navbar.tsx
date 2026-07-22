"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChefHat } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
   // ...inside the component:
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const loggedOutLinks = [
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const loggedInLinks = [
    ...loggedOutLinks,
    { href: "/items/add", label: "Add Recipe" },
    { href: "/items/manage", label: "My Recipes" },
    { href: "/ai-chat", label: "AI Assistant" },
  ];

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-orange-600">
          <ChefHat size={28} />
          SmartRecipe
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-orange-600 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors"
            >
              Login
            </Link>
          ) : (
            <button onClick={logout} className="text-gray-700 font-medium hover:text-orange-600">
  Logout
</button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-700 font-medium">
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="bg-orange-600 text-white px-5 py-2 rounded-full text-center font-medium">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}