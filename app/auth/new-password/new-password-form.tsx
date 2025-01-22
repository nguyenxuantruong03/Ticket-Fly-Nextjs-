"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-notification/form-error";
import FormSuccess from "@/components/form-notification/form-success";
import { Input } from "@/components/ui/input";
import axios from "axios";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Mật khẩu yêu cầu 6 kí tự!",
  }),
});

const NewPasswordForm = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/newPassword`,
        {
          password: data.password,
          token,
        }
      );

      if (response.data.success) {
        setSuccess(response.data.success);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message } = err.response?.data || {};
        setError(message || "Đã có lỗi xảy ra, vui lòng thử lại sau");
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
        </div>

        <Button className="w-full" type="submit" disabled={loading}>
          Thay đổi mật khẩu
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
