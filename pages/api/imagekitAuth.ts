// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_publicKey!,
  privateKey: process.env.privateKey!,
  urlEndpoint: process.env.NEXT_PUBLIC_urlEndpoint!,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(imagekit.getAuthenticationParameters());
}
