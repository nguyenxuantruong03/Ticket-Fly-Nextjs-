import NewVerificationForm from "./new-verification-form";
import CardWrapper  from '@/components/auth/card/card-wrapper';

const NewVerification = () => {
  return (
    <CardWrapper
      type="Verification Account"
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <NewVerificationForm />
    </CardWrapper>
  );
};

export default NewVerification;
