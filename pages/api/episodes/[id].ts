import { Comic, Genre, PrismaClient } from "@prisma/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Genre | Genre[] | any>
) {
  const { id } = req.query;
  switch (req.method) {
    case "DELETE":
      const deleted = await prisma.episode.update({
        where: { id: id?.toString() },
        data: { created: new Date("1000-10-10") },
      });
      return res.status(200).json(deleted);
      break;
    default:
      return res.status(500);
  }
}
