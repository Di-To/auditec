/*
  Warnings:

  - Added the required column `latitude` to the `SeasonFlowersEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `SeasonFlowersEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `SideWalksEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `SideWalksEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `CleaningEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `CleaningEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `InfrastructureEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `InfrastructureEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `GrassEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `GrassEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `FloorCoversEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `FloorCoversEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `TreesEval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `TreesEval` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SeasonFlowersEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seasonalFlowersEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "SeasonFlowersEval_seasonalFlowersEvalId_fkey" FOREIGN KEY ("seasonalFlowersEvalId") REFERENCES "SeasonFlowers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SeasonFlowersEval" ("date", "evalType", "grade", "id", "observation", "seasonalFlowersEvalId") SELECT "date", "evalType", "grade", "id", "observation", "seasonalFlowersEvalId" FROM "SeasonFlowersEval";
DROP TABLE "SeasonFlowersEval";
ALTER TABLE "new_SeasonFlowersEval" RENAME TO "SeasonFlowersEval";
CREATE TABLE "new_SideWalksEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sideWalksId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "SideWalksEval_sideWalksId_fkey" FOREIGN KEY ("sideWalksId") REFERENCES "SideWalks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SideWalksEval" ("date", "evalType", "grade", "id", "observation", "sideWalksId") SELECT "date", "evalType", "grade", "id", "observation", "sideWalksId" FROM "SideWalksEval";
DROP TABLE "SideWalksEval";
ALTER TABLE "new_SideWalksEval" RENAME TO "SideWalksEval";
CREATE TABLE "new_CleaningEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cleaningEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "CleaningEval_cleaningEvalId_fkey" FOREIGN KEY ("cleaningEvalId") REFERENCES "Cleaning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CleaningEval" ("cleaningEvalId", "date", "evalType", "grade", "id", "observation") SELECT "cleaningEvalId", "date", "evalType", "grade", "id", "observation" FROM "CleaningEval";
DROP TABLE "CleaningEval";
ALTER TABLE "new_CleaningEval" RENAME TO "CleaningEval";
CREATE TABLE "new_InfrastructureEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "infrastructureEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "InfrastructureEval_infrastructureEvalId_fkey" FOREIGN KEY ("infrastructureEvalId") REFERENCES "Infrastructure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InfrastructureEval" ("date", "evalType", "grade", "id", "infrastructureEvalId", "observation") SELECT "date", "evalType", "grade", "id", "infrastructureEvalId", "observation" FROM "InfrastructureEval";
DROP TABLE "InfrastructureEval";
ALTER TABLE "new_InfrastructureEval" RENAME TO "InfrastructureEval";
CREATE TABLE "new_GrassEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grassEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "GrassEval_grassEvalId_fkey" FOREIGN KEY ("grassEvalId") REFERENCES "Grass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GrassEval" ("date", "evalType", "grade", "grassEvalId", "id", "observation") SELECT "date", "evalType", "grade", "grassEvalId", "id", "observation" FROM "GrassEval";
DROP TABLE "GrassEval";
ALTER TABLE "new_GrassEval" RENAME TO "GrassEval";
CREATE TABLE "new_FloorCoversEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "floorCoversId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "FloorCoversEval_floorCoversId_fkey" FOREIGN KEY ("floorCoversId") REFERENCES "FloorCovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FloorCoversEval" ("date", "evalType", "floorCoversId", "grade", "id", "observation") SELECT "date", "evalType", "floorCoversId", "grade", "id", "observation" FROM "FloorCoversEval";
DROP TABLE "FloorCoversEval";
ALTER TABLE "new_FloorCoversEval" RENAME TO "FloorCoversEval";
CREATE TABLE "new_TreesEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "treeEval" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "TreesEval_treeEval_fkey" FOREIGN KEY ("treeEval") REFERENCES "Trees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TreesEval" ("date", "evalType", "grade", "id", "observation", "treeEval") SELECT "date", "evalType", "grade", "id", "observation", "treeEval" FROM "TreesEval";
DROP TABLE "TreesEval";
ALTER TABLE "new_TreesEval" RENAME TO "TreesEval";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
