// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { genHash } from "../../../feature/auth/libs/auth";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | User[] | any>
) {
  switch (req.method) {
    case "POST":
      const inputData: User = req.body;
      const hash = await genHash(inputData.password);
      inputData.password = hash;
      const newUser = await prisma.user.create({ data: inputData });
      return res.status(200).json(newUser);

    default:
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
  }
}
