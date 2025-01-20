import { getSession, refreshToken } from "./session";

export interface FeatchOption extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: FeatchOption = {}
) => {
  const session = await getSession();

  //Có thể không cần truyền option vì mặc định option đã là {} và khi chạy qua đây thì nó là `Bearer ${session?.accessToken`
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  let response = await fetch(url, options);

  //Nếu === 401 là Unauthorized thì sẽ refresh token
  if (response.status === 401) {
    if (!session?.refreshToken) {
      throw new Error("Refresh Token not found!");
    }

    const newAccessToken = await refreshToken(session.refreshToken);

    if (newAccessToken) {
      //Nếu có newAccessToken thì nó sẽ là newAccessToken
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
    }
  }

  return response;
};
