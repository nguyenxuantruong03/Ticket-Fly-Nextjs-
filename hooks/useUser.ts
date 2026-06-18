"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/authFetch";
import { User } from "@/types/users";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await authFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_USER}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: User = await response.json();
        if (isMounted) setUser(result);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Error fetching user");
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
