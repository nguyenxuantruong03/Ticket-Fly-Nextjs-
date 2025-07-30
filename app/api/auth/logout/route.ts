import { authFetch } from "@/lib/authFetch";
import { deleteSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const redirectPath =
    req.nextUrl.searchParams.get("redirect") || "/";

  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    { method: "POST" }
  );

  if (response.ok) {
    await deleteSession();
  }

  const redirectUrl = new URL("/auth/login", req.nextUrl.origin);
  redirectUrl.searchParams.set("redirect", redirectPath);

  return NextResponse.redirect(redirectUrl);
}

