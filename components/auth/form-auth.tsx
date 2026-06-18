"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UseFormReturn, FieldValues } from "react-hook-form";
import Social from "@/components/auth/card/social";

interface AuthFormProps<TFormValues extends FieldValues> {
  children: React.ReactNode;
  socialButton?: boolean;
  onSubmit: (values: TFormValues) => void;
  form?: UseFormReturn<TFormValues>;
  loading?: boolean;
  titleIntroduction: string;
  descriptionIntroduction: string;
  showSocial?: boolean;
  typeForm:
    | "login"
    | "register"
    | "forgot-password"
    | "new-password"
    | "two-factor"
    | "new-verification";
}

export default function AuthForm<TFormValues extends FieldValues>({
  children,
  socialButton = true,
  onSubmit,
  form,
  typeForm,
  loading,
  titleIntroduction,
  descriptionIntroduction,
  showSocial = false,
}: AuthFormProps<TFormValues>) {
  const formTitles: Record<string, string> = {
    login: "Login",
    register: "Register",
    "forgot-password": "Forgot Password",
    "new-password": "New Password",
    "two-factor": "Two Factor Authentication",
    "new-verification": "New Verification",
  };

  const title = formTitles[typeForm] || "Auth";

  const formRoutes: Record<string, string> = {
    login: "/auth/register",
    register: "/auth/login",
    "forgot-password": "/auth/login",
    "new-password": "/auth/login",
    "two-factor": "/auth/login",
    "new-verification": "/auth/login",
  };

  const hrefAuth = formRoutes[typeForm] || "/auth/login";

  const formRedirect: Record<string, string> = {
    login: "Register",
    register: "Login",
    "forgot-password": "Login",
    "new-password": "Login",
    "two-factor": "Login",
    "new-verification": "Login",
  };

  const titleRedirect = formRedirect[typeForm] || "Auth";

  const formMessages: Record<string, string> = {
    login: "I don't have an account",
    register: "Already have an account?",
    "forgot-password": "Go Back to",
    "new-password": "Go Back to",
    "two-factor": "Go Back to",
    "new-verification": "Go Back to",
  };

  const message = formMessages[typeForm] || "Welcome!";

  const formSubmit: Record<string, string> = {
    login: "Đăng nhập",
    register: "Đăng ký",
    "forgot-password": "Gửi",
    "new-password": "Gửi",
    "two-factor": "Gửi",
    "new-verification": "Gửi",
  };

  const contentSubmit = formSubmit[typeForm] || "Gửi";

  return (
    <div className="relative  min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
      {/* Background */}
      <div className="bg-blue-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-800 bottom-0 leading-5 h-full w-full overflow-hidden" />

      {/* Left Side Text */}
      <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
        <div className="self-start hidden lg:flex flex-col text-gray-300">
          <h1 className="my-3 font-semibold text-4xl">{titleIntroduction}</h1>
          <p className="pr-3 text-sm opacity-75">{descriptionIntroduction}</p>
        </div>
      </div>
      <div className="flex justify-center self-center  z-10">
        <div className="p-8 bg-white mx-auto rounded-3xl w-96 shadow-lg z-10">
          {/* Title & Subtitle */}
          <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">{title}</h3>
            <div className="text-gray-400 space-x-1">
              <span>{message}</span>
              <Link
                href={hrefAuth}
                className="text-sm text-blue-700 hover:text-blue-800 underline"
              >
                {titleRedirect}
              </Link>
            </div>
          </div>

          {form ? (
            <>
              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  {/* Body Form */}
                  {children}
                  {/* Submit button */}
                  {socialButton && (
                    <Button
                      type="submit"
                      className="w-full bg-[#002D74] hover:bg-[#04204a] hover:scale-110 duration-300 "
                      disabled={loading}
                    >
                      {contentSubmit}
                    </Button>
                  )}
                  {showSocial && (
                    <>
                      {/* OR Divider */}
                      <div className="flex items-center justify-center space-x-2 my-5">
                        <span className="h-px w-16 bg-gray-200" />
                        <span className="text-gray-400 text-sm">or</span>
                        <span className="h-px w-16 bg-gray-200" />
                      </div>

                      {/* Google Login */}
                      {socialButton && <Social loading={loading} />}
                    </>
                  )}
                </form>
              </Form>
            </>
          ) : (
            <>{children}</>
          )}

          {/* Footer */}
          <footer className="w-full mt-10 p-2 bg-white border-t border-gray-200 text-center">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-gray-700 text-sm">
                © {new Date().getFullYear()}{" "}
                <Link
                  href="https://www.facebook.com/nguyenxuantruong03/"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  Nguyên Xuân Trường
                </Link>{" "}
                | Website Fly Ticket - Đặt chuyến bay an toàn, nhanh chóng và tiện lợi.
              </p>

              <div className="flex space-x-4 mt-2">
                <Link
                  href="https://www.facebook.com/nguyenxuantruong03/"
                  target="_blank"
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07C2 17.1 5.66 21.1 10.44 21.88v-6.36h-3.1v-2.5h3.1v-1.9c0-3.07 1.84-4.77 4.66-4.77 1.35 0 2.75.24 2.75.24v3.02h-1.55c-1.53 0-2 .95-2 1.92v2.28h3.4l-.54 2.5h-2.86v6.36C18.34 21.1 22 17.1 22 12.07z" />
                  </svg>
                </Link>

                <Link
                  href="mailto:nguyenxuantruong20.30@gmail.com?subject=Liên hệ từ website học tiếng Anh Nguyễn Xuân Trường&body=Chào Trường, tôi muốn hỏi về..."
                  target="_blank"
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 13.065L2 6.5V17a2 2 0 002 2h16a2 2 0 002-2V6.5l-10 6.565zM12 11L2 4h20L12 11z" />
                  </svg>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ccc"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
