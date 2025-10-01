import { PrismaClient } from "../server/infrastructure/database/generated";

const prisma = new PrismaClient();

async function main() {
  console.log("🎵 Ajout des données de test...");

  // Création de 3 players vides
  console.log("📱 Création des players...");
  const players = await Promise.all([
    prisma.player.create({
      data: {
        id: "player-1",
        currentTrackId: null,
        playbackPosition: 0,
      },
    }),
    prisma.player.create({
      data: {
        id: "player-2",
        currentTrackId: null,
        playbackPosition: 0,
      },
    }),
    prisma.player.create({
      data: {
        id: "player-3",
        currentTrackId: null,
        playbackPosition: 0,
      },
    }),
  ]);

  // Création des albums
  console.log("💿 Création des albums...");
  const album1 = await prisma.album.create({
    data: {
      id: "album-1",
      title: "Dans la radio",
      imageUrl: "https://via.placeholder.com/300x300?text=Dans+la+radio",
    },
  });

  const album2 = await prisma.album.create({
    data: {
      id: "album-2",
      title: "Tout est magnifique",
      imageUrl: "https://via.placeholder.com/300x300?text=Tout+est+magnifique",
    },
  });

  // Création des tracks pour "Dans la radio"
  console.log("🎵 Création des tracks pour 'Dans la radio'...");
  const track1 = await prisma.track.create({
    data: {
      id: "track-1",
      title: "Dans la radio",
      duration: 366, // 6:06
      albumId: album1.id,
    },
  });

  // Création des tracks pour "Tout est magnifique"
  console.log("🎵 Création des tracks pour 'Tout est magnifique'...");
  const tracksAlbum2 = await Promise.all([
    prisma.track.create({
      data: {
        id: "track-2",
        title: "La tournure des choses",
        duration: 427, // 7:07
        albumId: album2.id,
      },
    }),
    prisma.track.create({
      data: {
        id: "track-3",
        title: "Faites quelque chose",
        duration: 305, // 5:05
        albumId: album2.id,
      },
    }),
    prisma.track.create({
      data: {
        id: "track-4",
        title: "Tout est magnifique",
        duration: 610, // 10:10
        albumId: album2.id,
      },
    }),
    prisma.track.create({
      data: {
        id: "track-5",
        title: "L'incroyable vie des choses",
        duration: 610, // 10:10
        albumId: album2.id,
      },
    }),
  ]);

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
