"use client";

import AuthForm from "../../../components/auth/form-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
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
import TurnstileWidget from "@/components/TurnstileWidget";
import { RegisterSchema } from "@/schemas/auths/auth";

export type RegisterFormalues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | undefined>();
  const [turnstileToken, setTurnstileToken] = useState("");

  const form = useForm<RegisterFormalues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data: RegisterFormalues) => {
    try {
      if (!turnstileToken) {
        setError("Vui lòng xác minh bảo mật (Captcha) trước khi tiếp tục.");
        return;
      }

      if (!data) {
        setError("Không thể gửi dữ liệu. Vui lòng thử lại sau.");
        return;
      }

      setLoading(true);
      setSuccess("");
      setError("");
      if (data) {
        setError(null); // Clear any existing errors before the request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_AUTH}/register`,
          {
            name: data.name,
            email: data.email,
            password: data.password,
            turnstileToken: turnstileToken,
          }
        );
        if (response.data.success) {
          setLoading(true);
          setSuccess(response.data.success);
        }

        if (response.data.error) {
          setError(response.data.error);
        }
      }
    } catch (err) {
      setLoading(false);

      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "Có lỗi xảy ra!";
        setError(errorMessage);
      } else {
        setError("Có lỗi xảy ra!");
      }
    }
  };
  return (
    <AuthForm
      typeForm="register"
      form={form}
      onSubmit={onSubmit}
      titleIntroduction={"Join us"}
      descriptionIntroduction={
        "Create your account to get started with our service."
      }
      showSocial
      loading={loading || !turnstileToken}
    >
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nguyen Xuan Truong"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} disabled={loading}/>
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
}
