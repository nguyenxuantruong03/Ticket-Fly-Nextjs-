"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { JSX, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormError from "@/components/form-notification/form-error";
import FormSuccess from "@/components/form-notification/form-success";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import FormHint from "@/components/form-notification/form-hint";
import FormWarning from "@/components/form-notification/form-warning";
import AuthForm from "@/components/auth/form-auth";
import { CountResendEmailVerifyCatch, TimeUnBanCatch } from "./catch";
import { ForgotPasswordSchema } from "@/schemas/auths/auth";
import TurnstileWidget from "@/components/TurnstileWidget";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [hint, setHint] = useState<string | JSX.Element | null>(null);
  const [warning, setWarning] = useState<JSX.Element | string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  // form bên dưới dùng để validate trường nhập theo loginForm bên dưới gọi form đẻ validate code đã xử lý ở  đây và bên dưới dùng destructuring để gọi hết vào
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    if (!turnstileToken) {
      setError("Vui lòng xác minh bảo mật (Captcha) trước khi tiếp tục.");
      return;
    }

    if (!data) {
      setError("Không thể gửi dữ liệu. Vui lòng thử lại sau.");
      return;
    }
    setHint("")
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgotPassword`,
        {
          email: data.email,
          turnstileToken: turnstileToken,
        }
      );

      const { countResendEmailVerify, success } = response.data;

      if (success || countResendEmailVerify) {
        setLoading(true)
        setSuccess(response.data.success);
        if (countResendEmailVerify >= 2) {
          const warningReSentVerificationEmail = CountResendEmailVerifyCatch({
            countResendEmailVerify,
          }).warningReSentVerificationEmail;

          setWarning(warningReSentVerificationEmail);
        }
      }
    } catch (err) {
      setLoading(false)
      if (axios.isAxiosError(err)) {
        const { message, timeUnBan } = err.response?.data || {};

        if (timeUnBan) {
          // ---------Kiểm tra nếu ban thì lọt vào đây------------
          const timeUnBanMesage = timeUnBan || "Có lỗi xảy ra!";
          // Định dạng ngày với date-fns
          const formattedDate = formatDistanceToNow(timeUnBanMesage, {
            locale: vi,
            addSuffix: true,
          });
          const hintBanned = TimeUnBanCatch({ formattedDate });

          setHint(hintBanned);
        } else if (message) {
          setError(message || "Đã có lỗi xảy ra, vui lòng thử lại sau");
        }
      }
    }
  };
  return (
    <AuthForm
      typeForm="forgot-password"
      form={form}
      onSubmit={onSubmit}
      titleIntroduction={"Join us"}
      descriptionIntroduction={
        "Create your account to get started with our service."
      }
      loading={loading || !turnstileToken}
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="truong@gmail.com"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        {warning && <FormWarning content={warning} />}
        {hint && <FormHint content={hint} />}
        {error && <FormError content={error} />}
        {success && <FormSuccess content={success} />}
        <TurnstileWidget onToken={setTurnstileToken} />
      </div>
    </AuthForm>
  );
};

export default ForgotPasswordForm;
