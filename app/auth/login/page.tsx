import LoginForm from "./login-form";
import CardWarpper from "@/components/auth/card/card-wrapper";

const LoginPage = () => {
  return (
    <CardWarpper
      type="Login"
      headerLabel="Welcome back"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account"
      showSocial
      forgotPassword
      iconRight
    >
      <LoginForm />
    </CardWarpper>
  );
};

export default LoginPage;
