import * as z from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ !",
  }),
});

export const LoginSchema = z.object({
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

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Mật khẩu yêu cầu 6 kí tự!",
  }),
});

export const RegisterSchema = z.object({
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

export const TwoFactorPasswordSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time code must be 6 characters.",
  }),
});
