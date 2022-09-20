-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SideWalks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "SideWalks_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SideWalks" ("greenAreaId", "id") SELECT "greenAreaId", "id" FROM "SideWalks";
DROP TABLE "SideWalks";
ALTER TABLE "new_SideWalks" RENAME TO "SideWalks";
CREATE TABLE "new_Infrastructure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "Infrastructure_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Infrastructure" ("greenAreaId", "id") SELECT "greenAreaId", "id" FROM "Infrastructure";
DROP TABLE "Infrastructure";
ALTER TABLE "new_Infrastructure" RENAME TO "Infrastructure";
CREATE TABLE "new_SeasonFlowers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "SeasonFlowers_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SeasonFlowers" ("greenAreaId", "id") SELECT "greenAreaId", "id" FROM "SeasonFlowers";
DROP TABLE "SeasonFlowers";
ALTER TABLE "new_SeasonFlowers" RENAME TO "SeasonFlowers";
CREATE TABLE "new_FloorCovers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "FloorCovers_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FloorCovers" ("greenAreaId", "id") SELECT "greenAreaId", "id" FROM "FloorCovers";
DROP TABLE "FloorCovers";
ALTER TABLE "new_FloorCovers" RENAME TO "FloorCovers";
CREATE TABLE "new_Grass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grassId" INTEGER NOT NULL,
    CONSTRAINT "Grass_grassId_fkey" FOREIGN KEY ("grassId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Grass" ("grassId", "id") SELECT "grassId", "id" FROM "Grass";
DROP TABLE "Grass";
ALTER TABLE "new_Grass" RENAME TO "Grass";
CREATE TABLE "new_GreenArea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "zoneId" INTEGER NOT NULL,
    "parkName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "surface" DECIMAL NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "GreenArea_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_GreenArea" ("id", "latitude", "location", "longitude", "parkName", "surface", "zoneId") SELECT "id", "latitude", "location", "longitude", "parkName", "surface", "zoneId" FROM "GreenArea";
DROP TABLE "GreenArea";
ALTER TABLE "new_GreenArea" RENAME TO "GreenArea";
CREATE TABLE "new_Trees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "treesId" INTEGER NOT NULL,
    CONSTRAINT "Trees_treesId_fkey" FOREIGN KEY ("treesId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Trees" ("id", "treesId") SELECT "id", "treesId" FROM "Trees";
DROP TABLE "Trees";
ALTER TABLE "new_Trees" RENAME TO "Trees";
CREATE TABLE "new_Cleaning" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "Cleaning_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cleaning" ("greenAreaId", "id") SELECT "greenAreaId", "id" FROM "Cleaning";
DROP TABLE "Cleaning";
ALTER TABLE "new_Cleaning" RENAME TO "Cleaning";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
