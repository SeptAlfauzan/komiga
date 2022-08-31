// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { compareHash } from "../../../feature/auth/libs/auth";
import { generateToken } from "../../../feature/jwt/libs/jose";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | boolean | string>
) {
  switch (req.method) {
    case "POST":
      const { username, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      const validate = await compareHash(password, user?.password!);
      if (!validate) return res.status(500).json(validate);

      const token = await generateToken(user);
      setCookie("tokenAuth", token, { req, res });
      return res.status(200).json(token);
      break;
    default:
      break;
  }
}
