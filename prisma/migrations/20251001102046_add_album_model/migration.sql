-- CreateTable
CREATE TABLE "albums" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tracks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "duration_seconds" INTEGER NOT NULL,
    "albumId" TEXT,
    CONSTRAINT "tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_tracks" ("duration_seconds", "id", "title") SELECT "duration_seconds", "id", "title" FROM "tracks";
DROP TABLE "tracks";
ALTER TABLE "new_tracks" RENAME TO "tracks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
