import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { generateMovieSchema, generateBreadcrumbSchema } from "@/lib/schema/movie";
import { getYoutubeEmbedUrl } from "@/lib/youtube";
import { getMovieBySlug, getSimilarMovies } from "@/lib/movies";
import SimilarMovies from "@/components/SimilarMovies";
import { Movie } from "@/types/movie";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovieBySlug(params.slug);
  if (!movie) return { title: "Film non trouvé" };

  return {
    title: movie.title_seo || `${movie.title} Streaming Gratuit - StreamFlix`,
    description: movie.meta_description_seo || movie.description_seo || `Regarder ${movie.title} en streaming gratuit sur StreamFlix`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/film/${params.slug}`
    }
  };
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovieBySlug(params.slug);
  if (!movie) notFound();

  const mainCategory = movie.genres[0];
  const embedUrl = movie.trailer_url ? getYoutubeEmbedUrl(movie.trailer_url) : '';
  const similarMovies = await getSimilarMovies(movie);

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

      <div className="relative">
        <div className="absolute inset-0 h-[50vh]">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
        </div>

        <div className="container mx-auto px-4 pt-[20vh]">
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            <div className="relative z-10">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>

            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-4">{movie.title} Streaming gratuit</h1>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  <span className="text-lg">{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-white/60" />
                  <span>{movie.runtime} minutes</span>
                </div>
                <div className="text-white/60">
                  {new Date(movie.release_date).toLocaleDateString('fr-FR')}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <Link
                    key={genre}
                    href={`/categorie/${genre.toLowerCase()}`}
                    className="bg-white/10 hover:bg-white/20 px-4 py-1 rounded-full text-sm transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
                  <p className="text-lg text-white/80">{movie.overview}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Acteurs principaux</h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <span
                        key={index}
                        className="bg-white/10 px-3 py-1 rounded-full text-sm"
                      >
                        {actor.name}
                      </span>
                    ))}
                  </div>
                </div>

                {embedUrl && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      Bande annonce {movie.title}
                    </h2>
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Regarder {movie.title} en Streaming
                  </h2>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/60">Lecteur vidéo à venir</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SimilarMovies movies={similarMovies} />
        </div>
      </div>
    </>
  );
}