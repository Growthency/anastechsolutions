import { NextResponse, type NextRequest } from "next/server";
import { decodeSessionValue, SESSION_COOKIE } from "@/lib/auth/session";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const sessionValue = req.cookies.get(SESSION_COOKIE)?.value;
  const session = decodeSessionValue(sessionValue);

  if (path.startsWith("/admin")) {
    if (!session) {
      const url = new URL("/login", req.nextUrl);
      return NextResponse.redirect(url);
    }
  }

  if (path === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
