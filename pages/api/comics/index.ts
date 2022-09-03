import { Comic, Genre, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Genre | Genre[]>
) {
  switch (req.method) {
    case "POST":
      const data: Comic = req.body;
      data.genreId = Number(data.genreId);
      const newComic = await prisma.comic.create({ data });

      return res.status(200).json(newComic);
    case "DELETE":
      break;
    default:
      const comics = await prisma.comic.findMany();

      return res.status(200).json(comics);
  }
}
