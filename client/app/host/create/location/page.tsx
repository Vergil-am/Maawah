"use client"
import PageHeader from "@/components/HostPageHeader"
import Footer from "@/components/host/create/footer"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Location from "@/components/host/create/location"
export default function LocationPage() {

  const router = useRouter()
  return (
    <>
      <div className=" h-[80vh] ">
        <PageHeader title="Where is your place located?" />
        <Location />
      </div>
      <Footer progress={40}>
        <Link href='/host/create/type' className="underline">Back</Link>
        <Button onClick={() => router.push('/host/create/location')} className="absolute right-0">Next</Button>
      </Footer>
    </>
  )
}
