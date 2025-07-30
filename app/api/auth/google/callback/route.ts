import { createSession } from "@/lib/session";
import { Role } from "@/type";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const role = searchParams.get("role");
  const redirectTo = searchParams.get("redirect") || "/";

  if (!accessToken || !refreshToken || !userId || !name || !role) {
    throw new Error("Google Oauth Failed!");
  }

  await createSession({
    user: {
      id: userId,
      name,
      role: role as Role,
    },
    accessToken,
    refreshToken,
  });

  redirect(redirectTo);
}
