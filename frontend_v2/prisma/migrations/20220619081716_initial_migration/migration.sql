-- CreateTable
CREATE TABLE "Tree" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "region" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "park" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "latitude" DECIMAL NOT NULL
);
