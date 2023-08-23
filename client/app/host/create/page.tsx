'use client'
import PageHeader from "@/components/HostPageHeader";
import Footer from "@/components/host/create/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
type params = {
  title: string,
  text: string
}
function ListItem({ title, text }: params) {
  return <>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>
    <span className="text-xl text-muted-foreground">{text}</span>
  </>

}

//TODO: add the steps functionality
export default function CreateListing() {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-around h-[80vh] max-md:flex-col max-md:justify-start max-md:mt-[10vh]">
        <PageHeader title="Create listing" description={`it's easy to create a listing`} />
        <section >
          <ul className="max-md:mt-[10vh] ">
            <li className="py-6">
              <ListItem title='Tell us about your place' text='share information about your place like where is it located and how many rooms' />
            </li>
            <Separator />
            <li className="py-6">
              <ListItem title='Share pictures of your place' text='Show people how your place looks and make it stand out' />
            </li>
            <Separator />
            <li className="py-6">
              <ListItem title='Finish up' text='Set the price and publish' />
            </li>
          </ul>
        </section>
      </div>
      <Footer progress={0}><Button onClick={() => router.push('/host/create/type')} className="absolute right-0">Start</Button></Footer>
    </>
  )
}
