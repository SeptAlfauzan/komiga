// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { genHash } from "../../../feature/auth/libs/auth";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  switch (req.method) {
    case "POST":
      const user = await prisma.user.findFirstOrThrow({
        where: {
          username: req.body.username,
          password: req.body.password,
        },
      });
      res.status(200).json(user);
      break;
    default:
      res.status(500);
      break;
  }
}
