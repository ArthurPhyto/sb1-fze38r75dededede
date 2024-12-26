import { createMovieSlug } from '@/lib/utils/slug';

export function generateMovieSchema(movie: any, category: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "description": movie.overview,
    "image": `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    "datePublished": movie.release_date,
    "duration": `PT${movie.runtime}M`,
    "genre": movie.genres,
    "actor": movie.cast.map((actor: { name: string }) => ({
      "@type": "Person",
      "name": actor.name
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": movie.vote_average,
      "bestRating": "10",
      "worstRating": "1",
      "ratingCount": movie.vote_count || 1000
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": movie.vote_average,
        "bestRating": "10",
        "worstRating": "1"
      },
      "author": {
        "@type": "Organization",
        "name": "StreamFlix"
      }
    }
  };
}

export function generateBreadcrumbSchema(movie: any, category: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Film Streaming",
        "item": process.env.NEXT_PUBLIC_SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL}/categorie/${category.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": movie.title,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL}/film/${movie.id}-${createMovieSlug(movie.title)}`
      }
    ]
  };
}