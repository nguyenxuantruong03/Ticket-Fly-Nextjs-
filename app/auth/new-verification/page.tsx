import CardWrapper from "@/components/auth/card/card-wrapper";
import NewVerificationForm from "./new-verification-form";

const NewVerification = () => {
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <NewVerificationForm />
    </CardWrapper>
  );
};

export default NewVerification;
