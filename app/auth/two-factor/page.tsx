import TwoFactorForm from "./two-factor-form";
import CardWrapper  from '@/components/auth/card/card-wrapper';

const TwoFactor = () => {
  return (
    <CardWrapper
      type="Two Factor Authentication"
      headerLabel="2FA"
      backButtonHref="/auth/login"
      backButtonLabel="Back"
    >
      <TwoFactorForm />
    </CardWrapper>
  );
};

export default TwoFactor;
