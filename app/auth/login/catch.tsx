import { AxiosError } from "axios";

interface ErrorResponseEmailNotVerifiedProps {
  emailNotVerified?: string;
}

interface EmailNotVerifiedProps {
  err: AxiosError<ErrorResponseEmailNotVerifiedProps>;
  loading: boolean;
  handleResendEmail: () => void;
}

export const EmailNotVerifiedCatch = ({
  err,
  loading,
  handleResendEmail,
}: EmailNotVerifiedProps) => {
  const emailNotVerified = err.response?.data?.emailNotVerified;
  // Tạo ra một hint để hiển thị thông báo gửi lại email xác thực
  const hintSentVerificationEmail = (
    <>
      {emailNotVerified}{" "}
      {loading ? (
        <span className="underline text-blue-700 cursor-wait">Đang gửi...</span>
      ) : (
        <span
          className="underline text-blue-700 cursor-pointer"
          onClick={handleResendEmail}
        >
          Nhấp vào đây
        </span>
      )}
      {" để chúng tôi có thể gửi lại email xác thực."}
    </>
  );

  return hintSentVerificationEmail;
};

interface ErrorResponseCountResendEmailProps {
  countResendEmailVerify?: number;
}

interface CountResendEmailProps {
  err: AxiosError<ErrorResponseCountResendEmailProps>;
}

export const CountResendEmailVerifyCatch = ({ err }: CountResendEmailProps) => {
  // Lấy số lần gửi lại email xác thực
  const countResendEmailVerify = err.response?.data?.countResendEmailVerify;

  // Nếu gửi lại >= 2 thì warning
  const warningReSentVerificationEmail = (
    <>
      Bạn đã yêu cầu gửi lại email xác thực
      <span className="text-[#713f12] font-bold mx-1">
        {countResendEmailVerify}
      </span>
      lần. Nếu bạn gửi quá 5 lần, tài khoản của bạn sẽ bị khóa trong 7 ngày. Hãy
      cẩn thận và đảm bảo không gửi quá nhiều yêu cầu. Chúng tôi thấy có dấu
      hiệu spam từ tài khoản của bạn.
    </>
  );
  return {
    warningReSentVerificationEmail: warningReSentVerificationEmail,
  };
};

interface TimeUnBanCatchProps {
  formattedDate: string;
}

export const TimeUnBanCatch = ({ formattedDate }: TimeUnBanCatchProps) => {
  const hintBanned = (
    <>
      Tài khoản của bạn đã bị khóa. Hãy quay lại vào
      <span className="underline text-blue-700 mx-1">{formattedDate}</span>.
    </>
  );

  return hintBanned;
};
