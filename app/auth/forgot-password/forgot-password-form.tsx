"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { JSX, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-notification/form-error";
import FormSuccess from "@/components/form-notification/form-success";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { CountResendEmailVerifyCatch, TimeUnBanCatch } from "./catch";
import FormHint from "@/components/form-notification/form-hint";
import FormWarning from "@/components/form-notification/form-warning";

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ !",
  }),
});

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [hint, setHint] = useState<string | JSX.Element | null>(null);
  const [warning, setWarning] = useState<JSX.Element | string | null>(null);

  // form bên dưới dùng để validate trường nhập theo loginForm bên dưới gọi form đẻ validate code đã xử lý ở  đây và bên dưới dùng destructuring để gọi hết vào
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgotPassword`,
        {
          email: data.email,
        }
      );

      const { countResendEmailVerify, success } = response.data;

      if (success || countResendEmailVerify) {
        setSuccess(response.data.success);
        if (countResendEmailVerify >= 2) {
          const warningReSentVerificationEmail = CountResendEmailVerifyCatch({
            countResendEmailVerify,
          }).warningReSentVerificationEmail;

          setWarning(warningReSentVerificationEmail);
        }
      }
    } catch (err) {
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
    }finally{
        setLoading(false)
    } 
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        </div>

        <Button className="w-full" type="submit" disabled={loading}>
          Gửi đến Email
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
