import { NextResponse } from "next/server";

export function middleware(request) {
  const authCookie = request.cookies.has("auth");

  const privateRoutes = ["/checkout", "/profile", "/profile/*"];

  privateRoutes.forEach((route) => {
    if (request.nextUrl.pathname.startsWith(route) && !authCookie) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  });

  const publicRoutes = ["/login", "/register", "/forgot-password"];

  publicRoutes.forEach((route) => {
    if (request.nextUrl.pathname.startsWith(route) && authCookie) {
      return NextResponse.rewrite(new URL("/profile", request.url));
    }
  });
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/",
    "/(api|trpc)(.*)",
  ],
};
