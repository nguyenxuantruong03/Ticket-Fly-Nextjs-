"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "@/components/form-notification/form-error";
import FormSuccess from "@/components/form-notification/form-success";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createSession } from "@/lib/session";
import TurnstileWidget from "@/components/TurnstileWidget";
import AuthForm from "@/components/auth/form-auth";
import { TwoFactorPasswordSchema } from "@/schemas/auths/auth";

const TwoFactorForm = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const email = searchParam.get("email");
  const redirect = searchParam.get("redirectfromlogin") || "/";

  const form = useForm<z.infer<typeof TwoFactorPasswordSchema>>({
    resolver: zodResolver(TwoFactorPasswordSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof TwoFactorPasswordSchema>) => {
    if (!turnstileToken) {
      setError("Vui lòng xác minh bảo mật (Captcha) trước khi tiếp tục.");
      return;
    }

    if (!data) {
      setError("Không thể gửi dữ liệu. Vui lòng thử lại sau.");
      return;
    }

    setError("");
    setSuccess("");
    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_AUTH}/twoFactor`,
        {
          email,
          code: data.code,
          turnstileToken: turnstileToken,
        }
      );

      const result = response.data;

      if (result.success) {
        setLoading(true);
      }

      //Create the session for auth user
      await createSession({
        user: {
          id: result.id,
          name: result.name,
          role: result.role,
          isTwoFactorEnabled: result.isTwoFactorEnabled,
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      // Điều hướng đến trang redirect hoặc trang mặc định
      router.push(redirect);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        const { message } = err.response?.data || {};
        setError(message || "Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    }
  };
  return (
    <AuthForm
      typeForm="two-factor"
      form={form}
      onSubmit={onSubmit}
      titleIntroduction={"Join us"}
      loading={loading || !turnstileToken}
      descriptionIntroduction={
        "Create your account to get started with our service."
      }
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Two Factor</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center">
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormDescription>
                Please enter the two factor sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        {error && <FormError content={error} />}
        {success && <FormSuccess content={success} />}
      </div>
      <TurnstileWidget onToken={setTurnstileToken} />
    </AuthForm>
  );
};

export default TwoFactorForm;
