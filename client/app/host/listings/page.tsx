import { DataTable } from "@/components/ui/data-table"
import { Listing, columns } from "./columns"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import PageHeader from "@/components/HostPageHeader"

async function getData(): Promise<Listing[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      title: "room 1",
      status: "available",
      location: "alger"
    },
  ]
}
export default async function Listings() {


  const data = await getData()
  return (

    <>
      <div className="w-100 flex justify-between">
        {/* <Link href='/host/create' className="flex"><Plus /> create a new listing</Link> */}
        <PageHeader title="Listings" description="view and edit your listings" />
        <Link href='/host/create'>
          <Button variant='outline' className="m-5"><Plus /> Create listing</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  )
}
