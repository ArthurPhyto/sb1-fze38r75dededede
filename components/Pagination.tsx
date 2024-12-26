import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const pages: (number | string)[] = [];

    // Toujours afficher la première page
    pages.push(1);

    // Calculer la plage autour de la page courante
    let leftBound = Math.max(2, currentPage - delta);
    let rightBound = Math.min(totalPages - 1, currentPage + delta);

    // Ajouter des points de suspension si nécessaire à gauche
    if (leftBound > 2) {
      pages.push('...');
    }

    // Ajouter les pages dans la plage
    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }

    // Ajouter des points de suspension si nécessaire à droite
    if (rightBound < totalPages - 1) {
      pages.push('...');
    }

    // Toujours afficher la dernière page si elle existe
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Bouton précédent */}
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      )}

      {/* Pages */}
      {getVisiblePages().map((page, index) => (
        typeof page === 'number' ? (
          <Link
            key={index}
            href={`${baseUrl}?page=${page}`}
            className={cn(
              "px-4 py-2 rounded-md font-medium transition-colors",
              currentPage === page
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            {page}
          </Link>
        ) : (
          <span key={index} className="px-2 text-white/60">
            {page}
          </span>
        )
      ))}

      {/* Bouton suivant */}
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}