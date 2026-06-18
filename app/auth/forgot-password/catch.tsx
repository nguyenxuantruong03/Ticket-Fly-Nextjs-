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



interface CountResendEmailProps {
  countResendEmailVerify?: number;
}

export const CountResendEmailVerifyCatch = ({
  countResendEmailVerify,
}: CountResendEmailProps) => {
  // Nếu gửi lại >= 2 thì warning
  const warningReSentVerificationEmail = (
    <>
      Bạn đã yêu cầu gửi lại email thay đổi mật khẩu
      <span className="text-[#713f12] font-bold mx-1">
        {countResendEmailVerify}
      </span>
      lần. Nếu bạn gửi quá 5 lần, tài khoản của bạn sẽ bị khóa trong 7 ngày.
      Chúng tôi thấy có dấu hiệu spam từ tài khoản của bạn.
    </>
  );
  return {
    warningReSentVerificationEmail: warningReSentVerificationEmail,
  };
};
