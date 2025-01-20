import Link from "next/link";
import RegisterForm from "./signupForm";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center space-y-8">
      <h1 className="text-center text-2xl font-bold">Sign Up</h1>
      {/* sign up form */}
      <RegisterForm />
      <div className="flex justify-between text-sm">
        <p>Already have an account?</p>
        <Link className="underline" href="/auth/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
