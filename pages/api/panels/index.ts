import { Panel } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";
import ImageKit from "imagekit";
import { imageKitDelete } from "../../../libs/imageKitDelete";

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
    case "PUT":
      try {
        const updatedData = await prisma.panel.updateMany({
          data: {},
          where: {},
        });
        console.log(updatedData);
        return res.status(200).json(updatedData);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    case "DELETE":
      try {
        const { id, imageId } = req.query;
        // const updatedPanel = await prisma.episode.update({
        //   where: { id: episode!.toString() },
        //   data: { panels: { set: [] } },
        //   include: { panels: true },
        // });
        const deletedImage = await imageKitDelete(imageId!.toString());
        const deleted = await prisma.panel.delete({
          where: { id: id!.toString() },
        });
        // console.log("image id", imageId);
        return res.status(200).json({ deleted, deletedImage });
      } catch (error) {
        return res.status(500).json(error);
      }
      break;
    default:
      const panels = await prisma.panel.findMany({
        include: { episode: true },
      });
      return res.status(200).json(panels);
  }
}
