import PageHeader from "@/components/HostPageHeader";
import Details from "@/components/host/create/details";
import Location from "@/components/host/create/location";
import SelectCategory from "@/components/host/create/selectCategory";


//TODO: add the steps functionality
export default function CreateListing() {

  return (
    <main className="container">
      <PageHeader title="Create listing" description='choose category' />
      {/* <SelectCategory /> */}
      {/* <Details /> */}
      <Location />
    </main>
  )
}