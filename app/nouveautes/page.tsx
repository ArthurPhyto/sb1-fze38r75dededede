import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import { Movie } from '@/types/movie';

interface Props {
  searchParams: { page?: string };
}

export const metadata: Metadata = {
  title: 'Nouveaux Films en Streaming - StreamFlix',
  description: 'Découvrez les derniers films ajoutés sur StreamFlix en streaming gratuit',
};

async function getLatestMovies(page: number = 1) {
  const limit = 30;
  const offset = (page - 1) * limit;

  const { data: movies, count } = await supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .order('release_date', { ascending: false })
    .range(offset, offset + limit - 1);

  return {
    movies: movies as Movie[] || [],
    totalPages: Math.ceil((count || 0) / limit)
  };
}

export default async function NouveautesPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const { movies, totalPages } = await getLatestMovies(currentPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Nouveaux Films en Streaming</h1>
      <MovieGrid movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/nouveautes"
      />
    </div>
  );
}