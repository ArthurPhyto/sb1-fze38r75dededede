import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock } from "lucide-react";
import { getMovie, getSimilarMovies } from "@/lib/movies";
import { getYoutubeEmbedUrl } from "@/lib/youtube";
import { generateMovieSchema, generateBreadcrumbSchema } from "@/lib/schema/movie";
import { Movie } from "@/types/movie";
import SimilarMovies from "@/components/SimilarMovies";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovie(params.id);
  if (!movie) return { title: "Film non trouvé" };

  return {
    title: movie.title_seo,
    description: movie.meta_description_seo,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/film/${params.id}`
    }
  };
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovie(params.id);
  if (!movie) return <div>Film non trouvé</div>;

  const similarMovies = await getSimilarMovies(movie);
  const embedUrl = movie.trailer_url ? getYoutubeEmbedUrl(movie.trailer_url) : '';
  const mainCategory = movie.genres[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateMovieSchema(movie, mainCategory))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(movie, mainCategory))
        }}
      />

      {/* Rest of the component remains the same */}
    </>
  );
}