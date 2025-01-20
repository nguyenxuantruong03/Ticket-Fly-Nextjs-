"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { createSession } from "@/lib/session";

const formSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ !",
  }),
  password: z
    .string()
    .min(6, {
      message: "Yêu cầu nhập tên ít nhất 6 ký tự!",
    })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{6,20}$/, {
      message: "Mật khẩu yêu cầu [a-z] và [0-9] ít nhất 6 ký tự!",
    }),
});

export type SignInFormalues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/"; // Lấy giá trị `redirect` từ URL hoặc mặc định là "/"

  const form = useForm<SignInFormalues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data: SignInFormalues) => {
    try {
      setLoading(true);
      if (data) {
        setError(null); // Clear any existing errors before the request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
          {
            email: data.email,
            password: data.password,
          }
        );
        //Create the ssion for auth user
        const result = response.data;
        await createSession({
          user: {
            id: result.id,
            name: result.name,
            role: result.role
          },
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });
      }

      // Điều hướng đến trang redirect hoặc trang mặc định
      router.push(redirect);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || "Có lỗi xảy ra!";
        setError(errorMessage);
      } else {
        setError("Có lỗi xảy ra!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex flex-col gap-2">
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
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="**********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link className="underline text-xs" href="#">
            Forgot your password?
          </Link>
        </div>
        <div className="space-y-2">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? "Loading..." : "Sign in"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
