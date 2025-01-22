import CardWrapper from "@/components/auth/card/card-wrapper";
import ForgotPasswordForm from "./forgot-password-form";

const ForgotPassword = () => {
  return (
    <CardWrapper
      headerLabel="Forgot your password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <ForgotPasswordForm />
    </CardWrapper>
  );
};

export default ForgotPassword;
