import { supabase } from './supabase';
import { Movie } from '@/types/movie';

export async function getCategoryMovies(category: string, page: number = 1) {
  if (!category) return null;

  // Vérifie d'abord si la catégorie existe
  const { data: categoryExists } = await supabase
    .from('categorie')
    .select('name')
    .ilike('name', category)
    .single();

  if (!categoryExists) {
    return null;
  }

  const limit = 30;
  const offset = (page - 1) * limit;

  const { data: movies, count } = await supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .contains('genres', [categoryExists.name])
    .order('release_date', { ascending: false })
    .range(offset, offset + limit - 1);

  if (!movies?.length) return null;

  return {
    movies: movies as Movie[],
    totalPages: Math.ceil((count || 0) / limit)
  };
}