import { Panel } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_publicKey!,
  privateKey: process.env.privateKey!,
  urlEndpoint: process.env.NEXT_PUBLIC_urlEndpoint!,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Panel | Panel[] | any>
) {
  switch (req.method) {
    case "POST":
      const newPanel = await prisma.panel.create({ data: req.body });
      return res.status(200).json(newPanel);
    case "DELETE":
      break;
    default:
      const panels = await prisma.panel.findMany({
        include: { episode: true },
      });
      return res.status(200).json(panels);
  }
}
