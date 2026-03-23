import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedPaths = ["/profile"];
  const userOnlyPaths = ["/booking"];
  const authPaths = ["/login", "/register"];

  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  const isUserOnlyPath = userOnlyPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  const isAuthPath = authPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // Debug logging
  if (isUserOnlyPath) {
    console.log("Middleware - Path:", req.nextUrl.pathname);
    console.log("Middleware - Token exists:", !!token);
    console.log("Middleware - Token role:", token?.role);
    console.log("Middleware - Full token:", token);
  }

  // Check for user role on booking routes
  if (isUserOnlyPath && (!token || token?.role !== "user")) {
    console.log("Middleware - BLOCKED: No token or role !== user");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
