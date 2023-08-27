import Details from "@/components/host/create/details"
import DropeZone from "@/components/host/create/DropeZone"
import Location from "@/components/host/create/location"
import SelectCategory from "@/components/host/create/selectCategory"
import PageHeader from "@/components/HostPageHeader"
import Description from "@/components/host/create/Description"
import { Separator } from "@/components/ui/separator";

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


type props = {
  params: {
    step: string
  }
}
export default function Create({ params }: props) {
  const { step } = params
  if (step === 'create') {
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
      </>
    )
  }
  if (step === 'type') {
    return (
      <div className=" h-[80vh] ">
        <PageHeader title="Which of these describe your place" />
        <SelectCategory />
      </div>)
  }
  if (step === 'details') {
    return (
      <div className="h-[80vh]">
        <PageHeader title="share some basics about your place" />
        <Details />
      </div>)
  }
  if (step === 'description') {
    return (
      <div className=" h-[80vh] ">
        <PageHeader title="Give your place a title and desctiption" />
        <Description />
      </div>)
  }
  if (step === 'location') {
    return (
      <div className="h-[80vh] ">
        <PageHeader title="Where is your place located?" />
        <Location />
      </div>
    )
  }
  if (step === 'images') {
    return (
      <div className="h-[80vh] ">
        <PageHeader title="share some pictures of your place" />
        <DropeZone />
      </div>
    )
  }

  else {
    throw new Error('not found')
  }


}
