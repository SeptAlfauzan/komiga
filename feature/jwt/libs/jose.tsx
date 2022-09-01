import { jwtDecrypt, JWTPayload, jwtVerify, SignJWT } from "jose";

export const generateToken = async (data: any): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET!.toString()
      );
      const jwt = await new SignJWT(data)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("6h")
        .sign(secret);
      resolve(jwt);
    } catch (error) {
      reject(error);
    }
  });

export const validateToken = async (jwt: string): Promise<JWTPayload> =>
  new Promise(async (resolve, reject) => {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET!.toString()
    );
    try {
      const { payload } = await jwtVerify(jwt, secret);
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
