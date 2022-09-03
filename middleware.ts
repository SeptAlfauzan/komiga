import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";
import { validateToken } from "./feature/jwt/libs/jose";
import { PrismaClient, User } from "@prisma/client";
import { JWTPayload } from "jose";
import axios from "axios";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { origin } = request.nextUrl;
  switch (request.nextUrl.pathname.split("/")[1]) {
    case "admin":
      try {
        const cookieToken = request.cookies.get("tokenAuth");
        const payload = await validateToken(cookieToken!);
        // if(typeof payload.username !== "string" || typeof payload.username !== "string") return NextResponse.redirect(`${origin}/auth`);

        return NextResponse.next();
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(`${origin}/auth`);
      }
    default:
      return NextResponse.next();
  }
}
