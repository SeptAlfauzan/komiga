import { Genre, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Genre | Genre[] | string>
) {
  switch (req.method) {
    case "POST":
      const newGenre = await prisma.genre.create({ data: req.body });
      return res.status(200).json(newGenre);
      break;
    case "DELETE":
      break;
    default:
      const genres = await prisma.genre.findMany();

      return res.status(200).json(genres);
      break;
  }
}
