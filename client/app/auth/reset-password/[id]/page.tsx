import Link from "next/link"
import ResetPasswordFormStep2 from "@/components/auth/resetPassword/resetPasswordFormStep2"

export default function ResetPassword({ params }: { params: { id: number } }) {
  console.log(params.id)
  return (
    <div className="lg:p-8 h-full grid place-items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            enter the code recieved in your email and your new password
          </p>
        </div>

        <ResetPasswordFormStep2 userId={params.id} />
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
  )
}
