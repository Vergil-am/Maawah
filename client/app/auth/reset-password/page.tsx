"use client"
import Link from "next/link"
import ResetPasswordForm from "@/components/auth/resetPassword/resetPasswordForm"
import { useAtom } from "jotai";
import { StepAtom } from "@/lib/Atoms";
import ResetPasswordFormStep2 from "@/components/auth/resetPassword/resetPasswordFormStep2";


export default function ResetPassword() {

  const [Step, setStep] = useAtom(StepAtom)
  switch (Step) {
    case 1:
      return (
        <>
          <p className="text-sm text-muted-foreground">
            enter your email address and we will send you a verfication code
          </p>

          <ResetPasswordForm />

        </>
      )

    case 2:
      return (
        <>
          <ResetPasswordFormStep2 />
        </>

      )
  }


}
