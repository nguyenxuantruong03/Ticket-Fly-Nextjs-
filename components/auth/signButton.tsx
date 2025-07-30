"use client";

import { useState, useEffect } from "react";
import { getSession, Session } from "@/lib/session";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";

const SignButton = () => {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    try {
      const currentPath = window.location.pathname;

      await axios.get(
        `/api/auth/logout?redirect=${encodeURIComponent(currentPath)}`
      );

      // 👇 Client tự redirect sau khi gọi xong API
      window.location.href = `/auth/login?redirect=${encodeURIComponent(
        currentPath
      )}`;
    } catch (error) {
      console.error(error);
    }
  };

  const loginUrl = pathname
    ? `/auth/login?redirect=${encodeURIComponent(pathname)}`
    : `/auth/login`;

  return (
    <div className="flex items-center gap-2 ml-auto">
      {!session || !session.user ? (
        <>
          <Link href={loginUrl}>
            <Button
              className="dark:text-slate-200 text-salte-900"
              variant="link"
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              className="dark:text-slate-200 text-salte-900"
              variant="link"
            >
              Register
            </Button>
          </Link>
        </>
      ) : (
        <>
          <p>{session.user.name}</p>
          <Button
            className="dark:text-slate-200 text-salte-900"
            variant="link"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

export default SignButton;
