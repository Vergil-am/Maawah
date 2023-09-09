import Link from "next/link";

import { SigninForm } from "@/components/auth/signinForm";


export default function Signin({ searchParams }: { searchParams: { error: string, callbackUrl: string } }) {
  return (
    <div className="lg:p-8 h-full grid place-items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Signin to your account</h1>
          <p className="text-sm text-muted-foreground">
            or you don't have an account? <Link href="/auth/signup">Create an account</Link>
          </p>
        </div>
        <SigninForm searchParams={searchParams} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
