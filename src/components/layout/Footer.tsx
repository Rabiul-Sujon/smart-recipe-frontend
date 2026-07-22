import Link from "next/link";
import { ChefHat, Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <ChefHat size={24} className="text-orange-500" />
            SmartRecipe
          </div>
          <p className="text-sm text-gray-400">
            Discover recipes and get AI-powered meal ideas from what's already in your kitchen.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/explore" className="hover:text-orange-500">All Recipes</Link></li>
            <li><Link href="/ai-chat" className="hover:text-orange-500">AI Assistant</Link></li>
            <li><Link href="/items/add" className="hover:text-orange-500">Add Recipe</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-orange-500">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-500">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@smartrecipe.app
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1234-567890
            </li>
          </ul>
<div className="flex gap-4 mt-4">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
    <FaFacebook size={20} />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
    <FaInstagram size={20} />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
    <FaXTwitter size={20} />
  </a>
</div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SmartRecipe. All rights reserved.
      </div>
    </footer>
  );
}