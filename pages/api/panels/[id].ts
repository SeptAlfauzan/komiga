import { Comic, Genre, Panel, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Genre | Genre[] | any>
) {
  const { id } = req.query;
  switch (req.method) {
    case "POST":
      break;
    case "DELETE":
      break;
    default:
      const { id, episodeId } = req.query;
      console.log(id, episodeId);
      const panels: Panel[] = await prisma.panel.findMany({
        where: {
          episode: { id: episodeId?.toString(), comicId: id?.toString() },
        },
      });
      return res.status(200).json(panels);
  }
}
