"use client"
import DetailsForm from "@/components/auth/signup/detailsForm";
import EmailForm from "@/components/auth/signup/emailForm";
import PasswordForm from "@/components/auth/signup/passwordForm";
import { useAtomValue } from "jotai";
import { StepAtom } from "@/lib/Atoms";


export default function AuthenticationPage() {
  const Step = useAtomValue(StepAtom)
  switch (Step) {
    case 1:
      return <EmailForm />
    case 2:
      return <DetailsForm />
    case 3:
      return <PasswordForm />
  }

}
