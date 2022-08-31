import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";
import { validateToken } from "./feature/jwt/libs/jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { origin } = request.nextUrl;
  switch (request.nextUrl.pathname.split("/")[1]) {
    case "admin":
      const cookie = getCookie("tokenAuth", { path: "/" }) || "";
      console.log(cookie);
      const validToken = await validateToken(
        request.cookies.get("tokenAuth") || ""
      );
      if (!validToken) return NextResponse.redirect(`${origin}/auth`);
      return NextResponse.next();
    default:
      return NextResponse.next();
  }
}
