"use server";
import { SignJWT } from "jose/jwt/sign";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { Role } from "@/types/users";

export type Session = {
  user: {
    id: string;
    name: string;
    role: Role;
    isTwoFactorEnabled?: boolean;
    image?: string
  };
  accessToken: string;
  refreshToken?: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodeKey = new TextEncoder().encode(secretKey);
const isProduction = process.env.NODE_ENV === "production";
//Create Session
export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await new SignJWT({
    user: payload.user,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.user.id) // ⚠️ thêm dòng này để backend đọc được payload.sub
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodeKey);

  (await cookies()).set("session", session, {
    // giúp bảo vệ cookie khỏi việc truy cập từ JavaScript (ngăn chặn XSS).
    httpOnly: true,
    // đảm bảo cookie chỉ được gửi qua HTTPS.
    secure: isProduction,
    expires: expiredAt,
    // giúp ngăn chặn CSRF bằng cách chỉ cho phép cookie được gửi khi yêu cầu đến từ cùng một miền.
    sameSite: "lax",
    // path: "/" nghĩa là cookie sẽ được gửi với mọi yêu cầu, bất kể bạn truy cập trang nào trên trang web.
    // path: "/dashboard" chỉ định rằng cookie chỉ được gửi khi người dùng truy cập các trang có
    // đường dẫn bắt đầu bằng "/dashboard" (ví dụ: /dashboard, /dashboard/settings).
    path: "/",
  });
}

export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, encodeKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (err) {
    console.error("Failed to verify session", err);
    redirect("/auth/login");
  }
}

//Delete session
export async function deleteSession() {
  (await cookies()).delete("session");
}

//Refresh token
export const refreshToken = async (oldrefreshToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_AUTH}/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: oldrefreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const { accessToken, refreshToken } = await response.json();

    const updateRes = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/update`,
      {
        method: "POST",
        body: JSON.stringify({
          accessToken,
          refreshToken,
        }),
      }
    );

    if (!updateRes.ok) throw new Error("Failed to update tokens");

    return accessToken;
  } catch (error) {
    console.error("RefreshToken failed", error);
    return null;
  }
};

//Update tokens
export async function updateTokens({ accessToken }: { accessToken: string }) {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  // payload chứa dữ liệu (claims) được mã hóa bên trong JWT.
  const { payload } = await jwtVerify<Session>(cookie, encodeKey);
  if (!payload) throw new Error("Session not found");

  const newPayload: Session = {
    user: { ...payload.user },
    accessToken,
  };

  await createSession(newPayload);
}
