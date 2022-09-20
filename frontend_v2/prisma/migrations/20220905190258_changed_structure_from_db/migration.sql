-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coutryName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Region" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "countryId" INTEGER NOT NULL,
    CONSTRAINT "Region_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "regionId" INTEGER NOT NULL,
    CONSTRAINT "Municipality_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "zoneName" TEXT NOT NULL,
    "municipalityId" INTEGER NOT NULL,
    CONSTRAINT "Zone_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ZoneEvaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "zoneName" TEXT NOT NULL,
    "zoneEvaluationId" INTEGER NOT NULL,
    CONSTRAINT "ZoneEvaluation_zoneEvaluationId_fkey" FOREIGN KEY ("zoneEvaluationId") REFERENCES "Zone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GreenArea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "zoneId" INTEGER NOT NULL,
    "parkName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "surface" DECIMAL NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "GreenArea_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Grass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grassId" INTEGER NOT NULL,
    CONSTRAINT "Grass_grassId_fkey" FOREIGN KEY ("grassId") REFERENCES "GreenArea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GrassEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grassEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    CONSTRAINT "GrassEval_grassEvalId_fkey" FOREIGN KEY ("grassEvalId") REFERENCES "Grass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "treesId" INTEGER NOT NULL,
    CONSTRAINT "Trees_treesId_fkey" FOREIGN KEY ("treesId") REFERENCES "GreenArea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TreesEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "treeEval" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    CONSTRAINT "TreesEval_treeEval_fkey" FOREIGN KEY ("treeEval") REFERENCES "Trees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Infrastructure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "Infrastructure_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InfrastructureEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "infrastructureEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    CONSTRAINT "InfrastructureEval_infrastructureEvalId_fkey" FOREIGN KEY ("infrastructureEvalId") REFERENCES "Infrastructure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FloorCovers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "FloorCovers_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FloorCoversEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "floorCoversId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    CONSTRAINT "FloorCoversEval_floorCoversId_fkey" FOREIGN KEY ("floorCoversId") REFERENCES "FloorCovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SideWalks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "SideWalks_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SideWalksEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sideWalksId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    CONSTRAINT "SideWalksEval_sideWalksId_fkey" FOREIGN KEY ("sideWalksId") REFERENCES "SideWalks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cleaning" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "Cleaning_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CleaningEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cleaningEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    CONSTRAINT "CleaningEval_cleaningEvalId_fkey" FOREIGN KEY ("cleaningEvalId") REFERENCES "Cleaning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeasonFlowers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "SeasonFlowers_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeasonFlowersEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seasonalFlowersEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    CONSTRAINT "SeasonFlowersEval_seasonalFlowersEvalId_fkey" FOREIGN KEY ("seasonalFlowersEvalId") REFERENCES "SeasonFlowers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
