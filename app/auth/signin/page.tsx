import Link from "next/link";
import SigninForm from "./signinForm";
import { Button } from "@/components/ui/button";
import GoogleSVG from "@/public/google";

const SignInPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center space-y-3">
      <h1 className="text-center text-2xl font-bold">Sign In Page</h1>
      {/* sign in form */}
      <SigninForm />

      {/* Google */}
      <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`} className="w-full">
        <Button
          variant="outline"
          size="icon"
          className="flex items-center justify-center w-full"
        >
          <GoogleSVG />
        </Button>
      </Link>

      {/* Other */}
      <div className="flex justify-between text-sm">
        <p>Don&apos;t have an account?</p>
        <Link className="underline" href="/auth/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
