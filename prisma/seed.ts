import { PrismaClient } from "../server/infrastructure/database/generated";

const prisma = new PrismaClient();

async function main() {
  console.log("🎵 Ajout des tracks de test...");

  const players = await Promise.all([
    prisma.player.create({
      data: {
        id: "player-1",
        currentTrackId: null,
        playbackPosition: 0,
      },
    }),
  ]);

  const tracks = await Promise.all([
    prisma.track.create({
      data: {
        id: "track-1",
        title: "Bohemian Rhapsody",
        duration: 355, // 5:55
      },
    }),
    prisma.track.create({
      data: {
        id: "track-2",
        title: "Stairway to Heaven",
        duration: 482, // 8:02
      },
    }),
    prisma.track.create({
      data: {
        id: "track-3",
        title: "Hotel California",
        duration: 391, // 6:31
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
