import { Genre, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Genre | Genre[]>
) {
  switch (req.method) {
    case "POST":
      break;
    case "DELETE":
      break;
    default:
      const genres = await prisma.genre.findMany();

      res.status(200).json(genres);
      break;
  }
}
