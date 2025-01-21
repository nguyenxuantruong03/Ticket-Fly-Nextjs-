import CardWrapper from "@/components/auth/card/card-wrapper";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account ?"
      showSocial
      iconRight
    >
      <LoginForm />
    </CardWrapper>
  );
};

export default LoginPage;
