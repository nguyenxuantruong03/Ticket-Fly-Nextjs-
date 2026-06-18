"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "@/components/form-notification/form-error";
import FormSuccess from "@/components/form-notification/form-success";
import { Input } from "@/components/ui/input";
import axios from "axios";
import AuthForm from "@/components/auth/form-auth";
import { NewPasswordSchema } from "@/schemas/auths/auth";
import TurnstileWidget from "@/components/TurnstileWidget";

const NewPasswordForm = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
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
        `${process.env.NEXT_PUBLIC_BACKEND_AUTH}/newPassword`,
        {
          token,
          password: data.password,
          turnstileToken: turnstileToken,
        }
      );

      if (response.data.success) {
        setLoading(true)
        setSuccess(response.data.success);
      }
    } catch (err) {
      setLoading(false)
      if (axios.isAxiosError(err)) {
        const { message } = err.response?.data || {};
        setError(message || "Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    }
  };
  return (
    <AuthForm
      typeForm="new-password"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="**********"
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
        {error && <FormError content={error} />}
        {success && <FormSuccess content={success} />}
        <TurnstileWidget onToken={setTurnstileToken} />
      </div>
    </AuthForm>
  );
};

export default NewPasswordForm;
