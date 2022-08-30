// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { compareHash } from "../../../feature/auth/libs/auth";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | boolean>
) {
  switch (req.method) {
    case "POST":
      const { username, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      console.log(user?.password);
      const validate = await compareHash(password, user?.password!);
      return res.status(200).json(validate);
      break;
    default:
      break;
  }
}
