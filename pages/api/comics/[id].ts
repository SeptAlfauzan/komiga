import { Comic, Genre, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Genre | Genre[] | any>
) {
  const { id } = req.query;
  switch (req.method) {
    case "POST":
      req.body.created = new Date();
      const newEpisode = await prisma.episode.create({ data: req.body });
      return res.status(200).json(newEpisode);
    case "PUT":
      const updated = await prisma.comic.update({
        where: { id: id!.toString() },
        data: req.body,
      });
      console.log(id);
      console.log(req.body);
      return res.status(200).json(updated);
    case "DELETE":
      break;
    default:
      const comic = await prisma.episode.findMany({
        where: {
          comicId: id?.toString(),
          NOT: { created: "1000-10-10T00:00:00.000Z" },
        },
        include: { comic: true },
        orderBy: { created: "asc" },
      });
      return res.status(200).json(comic);
  }
}
