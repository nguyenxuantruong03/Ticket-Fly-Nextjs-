import NewPasswordForm from "./new-password-form";
import CardWrapper  from '@/components/auth/card/card-wrapper';

const NewPassword = () => {
  return (
    <CardWrapper
      type="New Password"
      headerLabel="Enter New password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <NewPasswordForm />
    </CardWrapper>
  );
};

export default NewPassword;
