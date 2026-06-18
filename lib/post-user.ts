"use server";

import { authFetch } from "./authFetch";

export const postUser = async (values: {
  name?: string | undefined;
  image?: string | undefined
  isTwoFactorEnabled?: boolean | undefined;
  email?: string | undefined;
  password?: string | undefined;
  newPassword?: string | undefined;
}) => {
  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_USER}/updateProfile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );

  const result = await response.json();
  return result;
};
