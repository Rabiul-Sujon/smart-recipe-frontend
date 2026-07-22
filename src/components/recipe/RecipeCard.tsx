import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";

interface RecipeCardProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  cuisine: string;
  cookTime: number;
  rating: number;
}

export default function RecipeCard({
  _id,
  title,
  description,
  image,
  cuisine,
  cookTime,
  rating,
}: RecipeCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
        <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          {cuisine}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {cookTime} min
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-orange-500" fill="currentColor" />
            {rating.toFixed(1)}
          </span>
        </div>

        <Link
          href={`/recipes/${_id}`}
          className="w-full text-center bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}