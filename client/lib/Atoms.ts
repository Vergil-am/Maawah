import { atom } from "jotai"

export const StepAtom = atom<number>(1)
export const UserIdAtom = atom<number | null>(null)
export const UserAtom = atom({
  name: "",
  email: "",
  phone: ""
})
