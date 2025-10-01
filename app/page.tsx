import { SimplePlayer } from "@/src/components/organisms/SimplePlayer";

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
