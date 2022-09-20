/*
  Warnings:

  - You are about to drop the column `floorCoversId` on the `FloorCoversEval` table. All the data in the column will be lost.
  - Added the required column `floorCoversEvalId` to the `FloorCoversEval` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FloorCoversEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "floorCoversEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "FloorCoversEval_floorCoversEvalId_fkey" FOREIGN KEY ("floorCoversEvalId") REFERENCES "FloorCovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FloorCoversEval" ("date", "evalType", "grade", "id", "latitude", "longitude", "observation") SELECT "date", "evalType", "grade", "id", "latitude", "longitude", "observation" FROM "FloorCoversEval";
DROP TABLE "FloorCoversEval";
ALTER TABLE "new_FloorCoversEval" RENAME TO "FloorCoversEval";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
