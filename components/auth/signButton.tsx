"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ChevronUp } from "lucide-react";
import InformationAvata from "./card/information-avata";
import { getInitialsName } from "@/lib/libs";
import { User } from "@/types/users";
import { Session } from "@/lib/session";
interface UserProps {
  user: User;
  sessionData: Session | null;
  textHome?: string;
}

const SignButton = ({ user, sessionData, textHome }: UserProps) => {
  const [opentMenuAvata, setOpenMenuAvata] = useState(false);
  const pathname = usePathname();
  const isLogged = !!(sessionData?.user && user);

  const handleLogout = async () => {
    try {
      const currentPath = window.location.pathname;

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

  const loginUrl = pathname
    ? `/auth/login?redirect=${encodeURIComponent(pathname)}`
    : `/auth/login`;

  return (
    <div className="flex items-center gap-2 ml-auto">
      {!isLogged ? (
        <>
          <Link href={loginUrl}>
            <Button
              className={`dark:text-slate-200 text-salte-900 ${textHome}`}
              variant="link"
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              className={`dark:text-slate-200 text-salte-900 ${textHome}`}
              variant="link"
            >
              Register
            </Button>
          </Link>
        </>
      ) : (
        <>
          <div>
            <Popover onOpenChange={setOpenMenuAvata}>
              <PopoverTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer ">
                  <Avatar>
                    {user.image ? (
                      <AvatarImage src={user.image} />
                    ) : (
                      <AvatarFallback>
                        {getInitialsName(user.name || "")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex items-center">
                    <p
                      className={`line-clamp-1 w-full max-w-24 truncate ${textHome}`}
                    >
                      {user.name}
                    </p>
                    {opentMenuAvata ? (
                      <ChevronUp className={`${textHome}`} />
                    ) : (
                      <ChevronDown className={`${textHome}`} />
                    )}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-screen md:w-60 max-w-none mt-2 p-0 overflow-hidden">
                <div>
                  <InformationAvata handleLogout={handleLogout} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
    </div>
  );
};

export default SignButton;
