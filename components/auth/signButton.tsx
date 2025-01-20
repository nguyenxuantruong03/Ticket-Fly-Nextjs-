"use client";

import { useState, useEffect } from "react";
import { getSession, Session } from "@/lib/session";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    await fetch("/api/auth/signout", { method: "GET" });
    setSession(null); // Cập nhật trạng thái session trên client
  };

  const signinUrl = pathname
    ? `/auth/signin?redirect=${encodeURIComponent(pathname)}`
    : `/auth/signin`;

  return (
    <div className="flex items-center gap-2 ml-auto">
      {!session || !session.user ? (
        <>
          <Link href={signinUrl}>
            <Button className="dark:text-slate-200 text-salte-900" variant="link">
              Sign in
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="dark:text-slate-200 text-salte-900" variant="link">
              Sign up
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
            Sign out
          </Button>
        </>
      )}
    </div>
  );
};

export default SignButton;
