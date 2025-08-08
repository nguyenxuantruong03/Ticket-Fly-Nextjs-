"use client";

import { Suspense } from "react";
import NewVerificationForm from "./new-verification-form";

export default function NewVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
  );
}
