"use client";
import Turnstile from "react-turnstile";

export default function TurnstileWidget({
  onToken,
}: {
  onToken: (token: string) => void;
}) {
  return (
    <Turnstile
      sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
      onSuccess={(token) => {
        onToken(token);
      }}
    />
  );
}
