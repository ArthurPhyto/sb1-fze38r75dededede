import Link from 'next/link';
import { Category } from '@/types/movie';
import { createCategorySlug } from '@/lib/utils/slug';

export default function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {categories?.map((category) => (
        <Link
          key={category.id}
          href={`/categorie/${createCategorySlug(category.name)}`}
          className="bg-red-600 hover:bg-red-700 transition-colors rounded-lg p-4 sm:p-6 text-center"
        >
          <h3 className="text-base sm:text-xl font-semibold text-white">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
}