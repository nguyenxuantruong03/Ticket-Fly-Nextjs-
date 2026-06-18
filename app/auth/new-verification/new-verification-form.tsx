"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FormSuccess from "@/components/form-notification/form-success";
import FormError from "@/components/form-notification/form-error";
import { Loader2 } from "lucide-react";
import axios from "axios";
import AuthForm from "@/components/auth/form-auth";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  //get token bên mail.ts
  const token = searchParams.get("token");

  // useCallback trong React được sử dụng để ghi nhớ một hàm, đảm bảo rằng tham chiếu hàm sẽ không thay đổi
  // qua các lần render trừ khi các phụ thuộc của nó thay đổi. Điều này hữu
  // ích khi tránh việc tạo lại hàm không cần thiết, đặc biệt là khi hàm đó được truyền qua các props đến
  // các component con hoặc được sử dụng trong mảng phụ thuộc của các hook khác như useEffect.
  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Không tìm thấy token!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_AUTH}/verificationAccount`,
        { token}
      );

      // Check if the response contains an error
      if (response.data.error) {
        setError(response.data.error);
      } else if (response.data.success) {
        setSuccess(response.data.success);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message } = err.response?.data || {};
        if (message) {
          // Kiểm tra nếu bên kia có trả throw error return {message:...} thì lọt vào đây
          const errorMessage = message || "Có lỗi xảy ra!";
          setError(errorMessage);
        }
      }
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AuthForm
      typeForm="new-verification"
      onSubmit={onSubmit}
      titleIntroduction={"Join us"}
      descriptionIntroduction={
        "Create your account to get started with our service."
      }
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <Loader2 className="animate-spin text-[#66b0de]" />
        )}
        {success && <FormSuccess content={success} />}
        {!success && error && <FormError content={error} />}
      </div>
    </AuthForm>
  );
};

export default NewVerificationForm;
