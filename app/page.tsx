import { SimplePlayer } from "@/front/components/organisms/SimplePlayer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Spotinext
          </h1>
          <p className="text-xl text-gray-300">
            Votre plateforme de musique nouvelle génération
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Albums populaires
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/albums/550e8400-e29b-41d4-a716-446655440010"
              className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-lg p-4 text-center border border-gray-700 hover:border-green-400"
            >
              <h3 className="text-lg font-medium mb-2">Dans la radio</h3>
            </Link>
            <Link
              href="/albums/550e8400-e29b-41d4-a716-446655440011"
              className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-lg p-4 text-center border border-gray-700 hover:border-green-400"
            >
              <h3 className="text-lg font-medium mb-2">Tout est magnifique</h3>
            </Link>
          </div>
        </section>

        <main className="flex justify-center">
          <SimplePlayer />
        </main>

        <footer className="mt-16 text-center text-gray-400">
          <p>© 2024 Spotinext - Construit avec Next.js et Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
