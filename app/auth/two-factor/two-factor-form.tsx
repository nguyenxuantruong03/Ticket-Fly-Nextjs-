"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import { getCaptchaToken } from "@/utils/captcha";
import CardWrapper from "@/components/auth/card/card-wrapper";

export const NewPasswordSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const TwoFactorForm = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const email = searchParam.get("email");
  const redirect = searchParam.get("redirectfromlogin") || "/";

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      // Token captcha
      const token = await getCaptchaToken();
      if (!token) {
        setError("Có lỗi xảy ra trong hệ thống token verify không được tạo!");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/twoFactor`,
        {
          email,
          code: data.code,
          tokenCaptcha: token,
        }
      );

      const result = response.data;

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
      if (axios.isAxiosError(err)) {
        const { message } = err.response?.data || {};
        setError(message || "Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <CardWrapper
      type="Two Factor Authentication"
      headerLabel="2FA"
      backButtonHref="/auth/login"
      backButtonLabel="Back"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <Button
            className="w-full bg-[#002D74] hover:bg-[#04204a] hover:scale-110 duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default TwoFactorForm;
