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
import axios from "axios";
import FormError from "@/components/form-notification/form-error";
import FormSuccess from "@/components/form-notification/form-success";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Yêu cầu nhập tên ít nhất 4 ký tự!",
  }),
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

export type RegisterFormalues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<RegisterFormalues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data: RegisterFormalues) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");
      if (data) {
        setError(null); // Clear any existing errors before the request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
          {
            name: data.name,
            email: data.email,
            password: data.password,
          }
        );

        if (response.data.error) {
          setError(response.data.error);
        }
      }
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyen Xuan Truong" {...field} />
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
                  <Input type="password" placeholder="**********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          {error && <FormError content={error} />}
          {success && <FormSuccess content={success} />}
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
