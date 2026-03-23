import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedPaths = ["/profile"];
  const authPaths = ["/login", "/register"];

  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  const isAuthPath = authPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session && isAuthPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
