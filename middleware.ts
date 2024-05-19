import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const unAuthRoutes = ["/login", "/register"];

export function middleware(req: NextRequest) {
    const bearer = req.cookies.get("bearer")?.value;
    const pathname = req.nextUrl.pathname;

    const authRoute = !unAuthRoutes.some((path) => pathname.startsWith(path));

    if (authRoute && !bearer)
        return NextResponse.redirect(new URL("/login", req.url));

    if (bearer && !authRoute)
        return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next();
}

export const config = {
    // Skip all paths that should not be internationalized. This example skips the
    // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
    // purpose: the middleware should only run on requests that pathname do not start with "api", "_next" e.g
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
