import { getSession, refreshToken } from "./session";

export interface FeatchOption extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: FeatchOption = {},
): Promise<Response> => {
  const session = await getSession();
  // Nếu không có accessToken, chuyển hướng sang login
  if (!session?.accessToken) {
    throw new Error("NO_SESSION");
  }

  // Gán Authorization Header
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
  };

  let response = await fetch(url, options);

  // Nếu access token hết hạn (401 Unauthorized), thử refresh
  if (response.status === 401) {
    try {
      // Nếu không có refreshToken => logout luôn
      if (!session.refreshToken) {
        throw new Error("Refresh token not found");
      }

      const newAccessToken = await refreshToken(session.refreshToken);

      // Nếu refresh thành công thì thử gọi lại API
      if (newAccessToken) {
        options.headers.Authorization = `Bearer ${newAccessToken}`;
        response = await fetch(url, options);
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return response;
};

