import { withAuth } from "next-auth/middleware";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next();
    }, {
    callbacks: {
        authorized({ req, token }) {
            const { pathname }: NextURL = req.nextUrl;

            if (pathname.startsWith("/api/auth") || pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forget-password")) {
                return true;
            }

            if (pathname === "/" || pathname.startsWith("/api/videos")) {
                return true;
            }

            return !!token;
        }
    }
}
)

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.svg).*)"]
}