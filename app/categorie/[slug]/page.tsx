import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import { getCategoryMovies } from '@/lib/categories';

interface Props {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const category = decodeURIComponent(params.slug);
  const currentPage = Number(searchParams.page) || 1;
  const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/categorie/${params.slug}`;

  const result = await getCategoryMovies(category);
  if (!result) notFound();

  return {
    title: `Films ${category} en Streaming Gratuit - Gratuit Streaming`,
    description: `Regarder les meilleurs films ${category} en streaming gratuit sur Gratuit Streaming`,
    alternates: {
      canonical: currentPage > 1 ? baseUrl : `${baseUrl}${searchParams.page ? `?page=${searchParams.page}` : ''}`
    }
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = decodeURIComponent(params.slug);
  const currentPage = Number(searchParams.page) || 1;
  const result = await getCategoryMovies(category, currentPage);

  if (!result) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Films {category}</h1>
      <MovieGrid movies={result.movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={result.totalPages}
        baseUrl={`/categorie/${params.slug}`}
      />
    </div>
  );
}