-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "username" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comic" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "genreId" INT4 NOT NULL,

    CONSTRAINT "Comic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Panel" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "image" STRING NOT NULL,
    "comicId" INT4 NOT NULL,

    CONSTRAINT "Panel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Comic_name_key" ON "Comic"("name");

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Panel" ADD CONSTRAINT "Panel_comicId_fkey" FOREIGN KEY ("comicId") REFERENCES "Comic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
