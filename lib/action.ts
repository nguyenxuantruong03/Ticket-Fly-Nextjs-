"use server";

import { authFetch } from "./authFetch";

export const getProfile = async () => {
  // const session = await getSession();
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/protected`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${session?.accessToken}`,
  //     },
  //   }
  // );
  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/protected`
  );

  const result = await response.json();
  return result;
};
