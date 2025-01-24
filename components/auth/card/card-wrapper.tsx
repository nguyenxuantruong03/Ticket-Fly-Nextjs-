import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import BackButton from "./back-button";
import Social from "./social";
import Header from "./header";
import Link from "next/link";

interface CardProps {
  children?: React.ReactNode;
  type: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  forgotPassword?: boolean;
  iconRight?: boolean;
  loading?: boolean;
}

const CardWarpper = ({
  children,
  type,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  forgotPassword,
  iconRight,
  loading
}: CardProps) => {
  return (
    <section className="bg-gray-100 max-w-3xl w-full grid md:grid-cols-2 rounded-2xl shadow-lg p-5 m-1 md:m-4 lg:m-0">
      <Card className="bg-transparent shadow-none border-none">
        <div className="px-8 md:px-12 lg:px-16">
          <CardHeader className="px-0">
            <Header type={type} label={headerLabel} />
          </CardHeader>

          {/* Form */}
          <CardContent className="px-0">{children}</CardContent>

          {showSocial && (
            <>
              <div className="grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-400" />
              </div>

              <CardFooter className="px-0">
                <Social loading={loading}/>
              </CardFooter>
            </>
          )}

          {forgotPassword && (
            <div className="text-xs mb-4 text-[#002D74]">
              <Link
                href="/auth/forgot-password"
                className="hover:border-slate-900 hover:border-b-[1px]"
              >
                Forgot your password?
              </Link>
            </div>
          )}

          <CardFooter className="p-0 pt-2 border-t border-[#002D74]">
            <BackButton
              iconRight={iconRight}
              label={backButtonLabel}
              href={backButtonHref}
            />
          </CardFooter>
        </div>
      </Card>

      <div className="md:block hidden w-full relative">
        <Link href="/">
          <Image
            alt="Auth Image"
            className="rounded-2xl object-cover"
            src="/images/billboard.avif"
            fill
          />
        </Link>
      </div>
    </section>
  );
};

export default CardWarpper;
