-- CreateTable
CREATE TABLE "Municipality" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "regionId" INTEGER NOT NULL,
    "municipalityName" TEXT NOT NULL,
    CONSTRAINT "Municipality_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "municipalityId" INTEGER NOT NULL,
    "zoneName" TEXT NOT NULL,
    CONSTRAINT "Zone_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ZoneEvaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "zoneId" INTEGER NOT NULL,
    "zoneIdentificationName" TEXT NOT NULL,
    CONSTRAINT "ZoneEvaluation_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GreenArea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "zoneEvaluationId" INTEGER NOT NULL,
    "parkName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "surface" DECIMAL NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    CONSTRAINT "GreenArea_zoneEvaluationId_fkey" FOREIGN KEY ("zoneEvaluationId") REFERENCES "ZoneEvaluation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ParentEvaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evaluationId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "observation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Grass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grassId" INTEGER NOT NULL,
    CONSTRAINT "Grass_grassId_fkey" FOREIGN KEY ("grassId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GrassEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grassEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "parentEvalId" INTEGER NOT NULL,
    CONSTRAINT "GrassEval_parentEvalId_fkey" FOREIGN KEY ("parentEvalId") REFERENCES "ParentEvaluation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GrassEval_grassEvalId_fkey" FOREIGN KEY ("grassEvalId") REFERENCES "Grass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "treesId" INTEGER NOT NULL,
    CONSTRAINT "Trees_treesId_fkey" FOREIGN KEY ("treesId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TreesEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "treeEval" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "parentEvalId" INTEGER NOT NULL,
    CONSTRAINT "TreesEval_parentEvalId_fkey" FOREIGN KEY ("parentEvalId") REFERENCES "ParentEvaluation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TreesEval_treeEval_fkey" FOREIGN KEY ("treeEval") REFERENCES "Trees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Infrastructure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "Infrastructure_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InfrastructureEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "infrastructureEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "parentEvalId" INTEGER NOT NULL,
    CONSTRAINT "InfrastructureEval_parentEvalId_fkey" FOREIGN KEY ("parentEvalId") REFERENCES "ParentEvaluation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InfrastructureEval_infrastructureEvalId_fkey" FOREIGN KEY ("infrastructureEvalId") REFERENCES "Infrastructure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FloorCovers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "FloorCovers_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FloorCoversEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "floorCoversEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "parentEvalId" INTEGER NOT NULL,
    CONSTRAINT "FloorCoversEval_parentEvalId_fkey" FOREIGN KEY ("parentEvalId") REFERENCES "ParentEvaluation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FloorCoversEval_floorCoversEvalId_fkey" FOREIGN KEY ("floorCoversEvalId") REFERENCES "FloorCovers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SideWalks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "SideWalks_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SideWalksEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sideWalksId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "parentEvalId" INTEGER NOT NULL,
    CONSTRAINT "SideWalksEval_parentEvalId_fkey" FOREIGN KEY ("parentEvalId") REFERENCES "ParentEvaluation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SideWalksEval_sideWalksId_fkey" FOREIGN KEY ("sideWalksId") REFERENCES "SideWalks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cleaning" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "Cleaning_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CleaningEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cleaningEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "parentEvalId" INTEGER NOT NULL,
    CONSTRAINT "CleaningEval_parentEvalId_fkey" FOREIGN KEY ("parentEvalId") REFERENCES "ParentEvaluation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CleaningEval_cleaningEvalId_fkey" FOREIGN KEY ("cleaningEvalId") REFERENCES "Cleaning" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeasonFlowers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "greenAreaId" INTEGER NOT NULL,
    CONSTRAINT "SeasonFlowers_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "GreenArea" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeasonFlowersEval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seasonalFlowersEvalId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "evalType" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "parentEvalId" INTEGER NOT NULL,
    CONSTRAINT "SeasonFlowersEval_parentEvalId_fkey" FOREIGN KEY ("parentEvalId") REFERENCES "ParentEvaluation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SeasonFlowersEval_seasonalFlowersEvalId_fkey" FOREIGN KEY ("seasonalFlowersEvalId") REFERENCES "SeasonFlowers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
