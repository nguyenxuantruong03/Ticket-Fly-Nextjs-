"use client";

import React from "react";
import { Button } from "../ui/button";
import axios from "axios";

interface SignOutButtonProps {
  children: React.ReactNode;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ children }) => {
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

  return (
    <Button
      className="dark:text-slate-200 text-slate-900"
      variant="outline"
      onClick={handleLogout}
    >
      {children}
    </Button>
  );
};

export default SignOutButton;
