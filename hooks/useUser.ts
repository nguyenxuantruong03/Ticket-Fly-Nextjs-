"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/authFetch";
import { User } from "@/types/users";
import axios from "axios";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Hàm xử lý logout sạch sẽ
  const handleLogout = async () => {
    try {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/";

      await axios.get(
        `/api/auth/logout?redirect=${encodeURIComponent(currentPath)}`,
      );

      // 👇 Client tự redirect sau khi gọi xong API
      window.location.href = `/auth/login?redirect=${encodeURIComponent(
        currentPath,
      )}`;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await authFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_USER}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: User = await response.json();
        if (isMounted) setUser(result);
      } catch (err: unknown) {
        if (err instanceof Error && err.message === "NO_SESSION") {
          await handleLogout(); // client only
        }
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error fetching user");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading, error };
}
