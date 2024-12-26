import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-md mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Gratuit Streaming</h3>
            <p className="text-white/60">
              Votre plateforme de streaming gratuit avec les derniers films en haute qualité.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories" className="text-white/60 hover:text-white transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/nouveautes" className="text-white/60 hover:text-white transition-colors">
                  Dernières sorties
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Administration</h4>
            <div className="flex gap-4">
              <Link 
                href="/admin" 
                className="text-white/60 hover:text-white transition-colors"
              >
                Accès admin
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Gratuit Streaming. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}