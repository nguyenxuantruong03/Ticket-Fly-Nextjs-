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
import { JSX, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { createSession } from "@/lib/session";
import FormError from "@/components/form-notification/form-error";
import FormHint from "@/components/form-notification/form-hint";
import FormWarning from "@/components/form-notification/form-warning";
import FormSuccess from "@/components/form-notification/form-success";
import {
  CountResendEmailVerifyCatch,
  EmailNotVerifiedCatch,
  TimeUnBanCatch,
} from "./catch";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

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

export type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("errorGoogle") || null
  );
  const [hint, setHint] = useState<JSX.Element | string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [warning, setWarning] = useState<JSX.Element | string | null>(null);

  const redirect = searchParams.get("redirect") || "/"; // Lấy giá trị `redirect` từ URL hoặc mặc định là "/"

  // Lấy errorGooglebanUntil để thay đổi thành t/g và dùng formatDistanceToNow để phải tải thư viện date-fns bên back-end
  const errorGooglebanUntil = searchParams.get("errorGooglebanUntil") || "";

  //Logic này sẽ chạy khi errorGooglebanUntil thay đổi
  useEffect(() => {
    if (errorGooglebanUntil !== "") {
      // Giải mã chuỗi ngày từ URL
      const decodedDate = decodeURIComponent(errorGooglebanUntil);

      // Chuyển đổi chuỗi ngày thành đối tượng Date
      const parsedDate = new Date(decodedDate);

      if (!isNaN(parsedDate.getTime())) {
        // Nếu `parsedDate` hợp lệ
        const formattedDate = formatDistanceToNow(parsedDate, {
          locale: vi,
          addSuffix: true,
        });
        setHint(
          `Tài khoản của bạn đã bị khóa. Hãy quay lại vào ${formattedDate}.`
        );
      }
    }
  }, [errorGooglebanUntil]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const handleResendEmail = async () => {
    setLoading(true);
    setHint("");
    setError("");
    setWarning("");
    setSuccess("");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reSendVerificationAccount`,
        {
          email: form.getValues("email"),
        }
      );
      setSuccess("Đã gửi lại email xác thực. Vui lòng kiểm tra email của bạn.");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          // Kiểm tra nếu bên kia có trả throw error return {message:...} thì lọt vào đây
          const errorMessage = err.response?.data?.message || "Có lỗi xảy ra!";
          setError(errorMessage);
        }
      }
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      setHint("");
      setError("");
      setWarning("");
      setSuccess("");
      if (data) {
        setError(null); // Clear any existing errors before the request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
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
            role: result.role,
          },
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });
      }

      // Điều hướng đến trang redirect hoặc trang mặc định
      router.push(redirect);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { countResendEmailVerify, emailNotVerified, timeUnBan, message } =
          err.response?.data || {};

        // Kiểm tra nếu bên kia có trả throw error return {countResendEmailVerify:...} thì lọt vào đây
        if (countResendEmailVerify || emailNotVerified) {
          // ------------Tạo ra một hint để hiển thị thông báo gửi lại email xác thực--------------
          const hintSentVerificationEmail = EmailNotVerifiedCatch({
            err,
            loading,
            handleResendEmail,
          });
          setHint(hintSentVerificationEmail);

          // -----------Lấy số lần gửi lại email xác thực----------
          const warningReSentVerificationEmail = CountResendEmailVerifyCatch({
            err,
          }).warningReSentVerificationEmail;

          if (countResendEmailVerify && countResendEmailVerify >= 2) {
            setWarning(warningReSentVerificationEmail);
          }
        } else if (timeUnBan) {
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
          // Kiểm tra nếu bên kia có trả throw error return {message:...} thì lọt vào đây
          const errorMessage = message || "Có lỗi xảy ra!";
          setError(errorMessage);
        }
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="**********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link className="underline text-xs" href="/auth/forgot-password">
            Forgot your password?
          </Link>
        </div>
        <div className="space-y-2">
          {warning && <FormWarning content={warning} />}
          {hint && <FormHint content={hint} />}
          {error && <FormError content={error} />}
          {success && <FormSuccess content={success} />}
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
