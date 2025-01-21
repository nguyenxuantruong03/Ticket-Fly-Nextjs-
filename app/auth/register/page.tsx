import RegisterForm from "./register-form";
import CardWrapper from "@/components/auth/card/card-wrapper";

const RegisterPage = () => {
  return (
    <CardWrapper
      headerLabel="Create an account!"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      showSocial
    >
      <RegisterForm />
    </CardWrapper>
  );
};

export default RegisterPage;
