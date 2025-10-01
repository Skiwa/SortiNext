-- CreateTable
CREATE TABLE "tracks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "duration_seconds" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currentTrackId" TEXT,
    "playback_position_seconds" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "players_currentTrackId_fkey" FOREIGN KEY ("currentTrackId") REFERENCES "tracks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
