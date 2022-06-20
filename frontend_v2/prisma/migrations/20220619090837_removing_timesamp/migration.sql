/*
  Warnings:

  - You are about to drop the column `timeStamp` on the `Tree` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tree" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "region" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "park" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL
);
INSERT INTO "new_Tree" ("id", "latitude", "longitude", "municipality", "park", "picture", "region") SELECT "id", "latitude", "longitude", "municipality", "park", "picture", "region" FROM "Tree";
DROP TABLE "Tree";
ALTER TABLE "new_Tree" RENAME TO "Tree";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
