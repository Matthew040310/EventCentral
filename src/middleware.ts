// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Allow access to the sign in page without redirect
  if (pathname === "/SignIn" || pathname === "/NotAuthorized"
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to /SignIn
  if (!req.auth) {
    return NextResponse.redirect(new URL(`${APP_BASE_PATH}/SignIn`, req.url));
  }

  // Allow authenticated users
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/).*)"],
  debug: true,
};