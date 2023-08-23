"use client"
import PageHeader from "@/components/HostPageHeader"
import Footer from "@/components/host/create/footer"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import SelectCategory from "@/components/host/create/selectCategory"
import Link from "next/link"

export default function ChooseTypePage() {
  const router = useRouter()
  return (
    <>
      <div className=" h-[80vh] ">
        <PageHeader title="Which of these describe your place" />
        <SelectCategory />
      </div>
      <Footer progress={20}>
        <Link href='/host/create' className="underline">Back</Link>
        <Button onClick={() => router.push('/host/create/location')} className="absolute right-0">Next</Button>
      </Footer>
    </>
  )
}
