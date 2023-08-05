"use client"
import DetailsForm from "@/components/auth/signup/detailsForm";
import EmailForm from "@/components/auth/signup/emailForm";
import PasswordForm from "@/components/auth/signup/passwordForm";
import { atom, useAtomValue } from "jotai";

const StepAtom = atom<number>(1)
const UserAtom = atom({
  name: "",
  email: "",
  phone: ""
})
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
export { StepAtom, UserAtom }
