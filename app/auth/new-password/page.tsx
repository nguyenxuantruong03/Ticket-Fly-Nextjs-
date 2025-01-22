import CardWrapper from "@/components/auth/card/card-wrapper";
import NewPasswordForm from "./new-password-form";

const NewPassword = () => {
  return (
    <CardWrapper
      headerLabel="Enter New password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <NewPasswordForm />
    </CardWrapper>
  );
};

export default NewPassword;
