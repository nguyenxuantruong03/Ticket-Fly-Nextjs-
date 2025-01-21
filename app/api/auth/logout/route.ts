import { authFetch } from "@/lib/authFetch";
import { deleteSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    {
      method: "POST",
    }
  );

  if (response.ok) {
    await deleteSession();
  }

  return NextResponse.redirect(new URL("/", req.nextUrl));
}
