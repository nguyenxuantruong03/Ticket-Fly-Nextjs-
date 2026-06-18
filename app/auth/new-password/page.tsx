"use client";

import { Suspense } from "react";
import NewPasswordForm from "./new-password-form";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordForm />
    </Suspense>
  );
}
