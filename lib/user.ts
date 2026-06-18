"use server";

import { authFetch } from "./authFetch";

export const getUser = async () => {
  const response = await authFetch(`${process.env.NEXT_PUBLIC_BACKEND_USER}`);
  const result = await response.json();
  return result;
};
