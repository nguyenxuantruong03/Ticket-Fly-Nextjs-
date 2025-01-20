import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export default async function middleware(req: NextRequest) {
  const session = await getSession();

  // Nếu chưa có session, điều hướng đến trang đăng nhập với truy vấn redirect
  if (!session || !session.user) {
    const redirectUrl = new URL("/auth/signin", req.nextUrl);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname); // Thêm ?redirect=/profile
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"], // Middleware áp dụng cho /profile
};
