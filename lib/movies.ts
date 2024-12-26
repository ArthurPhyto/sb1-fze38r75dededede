import { supabase } from './supabase';
import { Movie } from '@/types/movie';

export async function getMovie(id: string): Promise<Movie | null> {
  const { data: movie } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();
  return movie;
}

export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  const id = slug.split('-')[0];
  return getMovie(id);
}

export async function getSimilarMovies(movie: Movie): Promise<Movie[]> {
  const { data: movies } = await supabase
    .from("movies")
    .select("*")
    .contains("genres", [movie.genres[0]])
    .neq("id", movie.id)
    .order("vote_average", { ascending: false })
    .limit(4);
  return movies as Movie[] || [];
}

export async function getMoviesByCategory(category: string, page: number = 1) {
  const limit = 30;
  const offset = (page - 1) * limit;

  const { data: movies, count } = await supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .contains('genres', [category])
    .order('release_date', { ascending: false })
    .range(offset, offset + limit - 1);

  return { 
    movies: movies as Movie[] || [], 
    totalPages: Math.ceil((count || 0) / limit) 
  };
}