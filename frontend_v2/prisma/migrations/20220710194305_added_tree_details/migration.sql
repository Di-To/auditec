/*
  Warnings:

  - The primary key for the `Tree` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `picture` on the `Tree` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Tree` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- CreateTable
CREATE TABLE "Details" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "treeId" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "time" DATETIME NOT NULL,
    CONSTRAINT "Details_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tree" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "region" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "park" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL
);
INSERT INTO "new_Tree" ("id", "latitude", "longitude", "municipality", "park", "region") SELECT "id", "latitude", "longitude", "municipality", "park", "region" FROM "Tree";
DROP TABLE "Tree";
ALTER TABLE "new_Tree" RENAME TO "Tree";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Details_treeId_key" ON "Details"("treeId");
