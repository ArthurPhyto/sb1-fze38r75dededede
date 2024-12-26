import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import MovieGrid from '@/components/MovieGrid';
import CategoryList from '@/components/CategoryList';
import Pagination from '@/components/Pagination';
import MovieCount from '@/components/MovieCount';
import { Movie, Category } from '@/types/movie';

interface Props {
  searchParams: { page?: string };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const currentPage = Number(searchParams.page) || 1;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gratuit-streaming.fr';
  
  return {
    title: 'Gratuit Streaming - Voir tous les films en streaming gratuitement',
    description: 'Découvrez les derniers films en streaming gratuit sur Gratuit Streaming',
    alternates: {
      canonical: currentPage > 1 ? baseUrl : `${baseUrl}${searchParams.page ? `?page=${searchParams.page}` : ''}`
    }
  };
}

async function getLatestMovies(page: number = 1): Promise<{ movies: Movie[], totalPages: number }> {
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

async function getCategories(): Promise<Category[]> {
  const { data: categories } = await supabase
    .from('categorie')
    .select('*');
  return categories as Category[] || [];
}

export default async function Home({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const [{ movies, totalPages }, categories] = await Promise.all([
    getLatestMovies(currentPage),
    getCategories(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">Film streaming gratuit : trouvez tous les films en streaming sur Gratuit-Streaming.fr</h1>
        
        <p className="text-lg text-white/80 mb-8">
          Bienvenue sur <strong>Gratuit-Streaming.fr</strong>, votre destination ultime pour découvrir et profiter de <strong>films en streaming gratuitement</strong> ! Notre plateforme vous propose une vaste collection de films en streaming, soigneusement sélectionnés pour votre plus grand plaisir. Que vous soyez amateur de films d&apos;action, de comédies romantiques ou de documentaires passionnants, vous trouverez forcément votre bonheur parmi notre catalogue varié.
        </p>

        <MovieCount />
        <MovieGrid movies={movies} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/"
        />
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Catégories populaires</h2>
        <CategoryList categories={categories} />
      </section>

      <section className="mt-20 bg-white/5 rounded-xl p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Pourquoi choisir Gratuit-Streaming.fr ?</h2>
            <p className="text-white/80">De nos jours, le <strong>streaming gratuit</strong> est devenu une alternative populaire aux traditionnelles plateformes payantes. Mais parmi la multitude de sites de streaming disponibles, pourquoi choisir <strong>Gratuit-Streaming.fr</strong> ? La réponse est simple : nous offrons une large gamme de <strong>films complets</strong> et <strong>séries en streaming</strong>, le tout <strong>sans inscription nécessaire</strong>.</p>
            <p className="text-white/80 mt-4">Notre site est conçu pour offrir une expérience utilisateur fluide et agréable. Que vous soyez amateur de <strong>films français</strong>, de blockbusters hollywoodiens ou de séries captivantes, vous trouverez toujours quelque chose qui correspond à vos goûts sur <strong>Gratuit-Streaming.fr</strong>.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Des films complets et des séries en streaming vf et vostfr</h3>
            <p className="text-white/80">Saviez-vous que <strong>Gratuit-Streaming.fr</strong> propose une collection impressionnante de <strong>films en entier</strong>, allant des classiques intemporels aux nouveautés les plus attendues ? Vous avez accès à une sélection variée de genres, y compris action, comédie, drame, horreur et bien plus encore.</p>
            <p className="text-white/80 mt-4">En outre, notre plateforme offre des options de visionnage en <strong>version française (vf)</strong> et en <strong>version originale sous-titrée en français (vostfr)</strong>. Vous pouvez donc savourer vos films préférés dans la langue qui vous convient le mieux, sans aucune restriction.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Les avantages du streaming gratuit</h2>
            <p className="text-white/80">Il existe de nombreux avantages à utiliser <strong>Gratuit-Streaming.fr</strong> pour regarder des films en streaming :</p>
            <ul className="mt-4 space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span><strong>Gratuité :</strong> Pas besoin de souscrire à un abonnement coûteux pour accéder à notre bibliothèque de films et séries.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span><strong>Accessibilité :</strong> Notre site est accessible depuis n&apos;importe quel appareil connecté à Internet.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span><strong>Variété :</strong> Nous proposons une vaste gamme de contenu pour satisfaire toutes les préférences.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span><strong>Aucun téléchargement requis :</strong> Profitez de vos films préférés directement en ligne.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Comment fonctionne notre plateforme ?</h2>
            <p className="text-white/80">L&apos;utilisation de <strong>Gratuit-Streaming.fr</strong> est incroyablement simple et intuitive :</p>
            <ol className="mt-4 space-y-2 text-white/80 list-decimal pl-4">
              <li>Visitez notre site et explorez notre catalogue.</li>
              <li>Choisissez le film qui vous intéresse.</li>
              <li>Sélectionnez l&apos;option de lecture que vous préférez (vf ou vostfr).</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contenu sécurisé et légal</h3>
            <p className="text-white/80">Chez <strong>Gratuit-Streaming.fr</strong>, nous prenons très au sérieux le respect des droits d&apos;auteur et la sécurité de nos utilisateurs. Tous les contenus diffusés sur notre site sont soigneusement vérifiés pour garantir une expérience de streaming légale et sécurisée.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Films français et nouveautés à ne pas manquer</h2>
            <p className="text-white/80">Le cinéma français regorge de chefs-d&apos;œuvre et de talents prometteurs. Sur <strong>Gratuit-Streaming.fr</strong>, nous mettons un point d&apos;honneur à mettre en avant les <strong>films français</strong> qui ont marqué l&apos;histoire du cinéma, ainsi que ceux qui font actuellement sensation.</p>
            <p className="text-white/80 mt-4">Parmi les titres incontournables, vous trouverez des classiques tels que &quot;La Haine&quot;, &quot;Amélie Poulain&quot; et des pépites récentes comme &quot;Les Misérables&quot;. Notre collection est régulièrement mise à jour pour inclure les dernières sorties et les films primés lors des festivals de cinéma.</p>
          </div>
        </div>
      </section>
    </main>
  );
}