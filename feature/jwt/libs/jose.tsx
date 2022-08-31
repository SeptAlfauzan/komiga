import * as jose from "jose";
export const generateToken = async (data: any): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET!.toString()
      );
      const jwt = await new jose.SignJWT(data)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("6h")
        .sign(secret);
      resolve(jwt);
    } catch (error) {
      reject(error);
    }
  });

export const validateToken = async (jwt: string): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET!.toString()
      );
      const { payload } = await jose.jwtVerify(jwt, secret);
      if (Object.entries(payload).length > 0) return resolve(true);
      return resolve(false);
    } catch (error) {
      reject(error);
    }
  });
