export default function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-9 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}