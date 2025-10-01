import { PrismaClient } from "../server/infrastructure/database/generated";

const prisma = new PrismaClient();

async function main() {
  console.log("🎵 Ajout des données de test...");

  // Création de 3 players vides
  console.log("📱 Création des players...");
  const players = await Promise.all([
    prisma.player.create({
      data: {
        id: "550e8400-e29b-41d4-a716-446655440001",
        currentTrackId: null,
        playbackPosition: 0,
      },
    }),
    prisma.player.create({
      data: {
        id: "550e8400-e29b-41d4-a716-446655440002",
        currentTrackId: null,
        playbackPosition: 0,
      },
    }),
    prisma.player.create({
      data: {
        id: "550e8400-e29b-41d4-a716-446655440003",
        currentTrackId: null,
        playbackPosition: 0,
      },
    }),
  ]);

  console.log(
    "📱 Players créés avec les IDs:",
    players.map((p) => p.id)
  );

  // Création des albums
  console.log("💿 Création des albums...");
  const album1 = await prisma.album.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440010",
      title: "Dans la radio",
      imageUrl: "https://via.placeholder.com/300x300?text=Dans+la+radio",
    },
  });

  const album2 = await prisma.album.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      title: "Tout est magnifique",
      imageUrl: "https://via.placeholder.com/300x300?text=Tout+est+magnifique",
    },
  });

  console.log("💿 Albums créés avec les IDs:", {
    album1: album1.id,
    album2: album2.id,
  });

  // Création des tracks pour "Dans la radio"
  console.log("🎵 Création des tracks pour 'Dans la radio'...");
  const track1 = await prisma.track.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440020",
      title: "Dans la radio",
      duration: 366, // 6:06
      albumId: album1.id,
    },
  });

  console.log("🎵 Track 'Dans la radio' créé avec l'ID:", track1.id);

  // Création des tracks pour "Tout est magnifique"
  console.log("🎵 Création des tracks pour 'Tout est magnifique'...");
  const tracksAlbum2 = await Promise.all([
    prisma.track.create({
      data: {
        id: "550e8400-e29b-41d4-a716-446655440021",
        title: "La tournure des choses",
        duration: 427, // 7:07
        albumId: album2.id,
      },
    }),
    prisma.track.create({
      data: {
        id: "550e8400-e29b-41d4-a716-446655440022",
        title: "Faites quelque chose",
        duration: 305, // 5:05
        albumId: album2.id,
      },
    }),
    prisma.track.create({
      data: {
        id: "550e8400-e29b-41d4-a716-446655440023",
        title: "Tout est magnifique",
        duration: 610, // 10:10
        albumId: album2.id,
      },
    }),
    prisma.track.create({
      data: {
        id: "550e8400-e29b-41d4-a716-446655440024",
        title: "L'incroyable vie des choses",
        duration: 610, // 10:10
        albumId: album2.id,
      },
    }),
  ]);

  console.log(
    "🎵 Tracks 'Tout est magnifique' créées avec les IDs:",
    tracksAlbum2.map((t) => ({ title: t.title, id: t.id }))
  );

  console.log("✅ Seed terminé avec succès !");
  console.log(`📱 ${players.length} players créés`);
  console.log(`💿 2 albums créés`);
  console.log(`🎵 ${1 + tracksAlbum2.length} tracks créées`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
