import PageHeader from "@/components/HostPageHeader"
import { Reservation, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"


async function getData(): Promise<Reservation[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      title: "room 1",
      status: "pending",
      from: new Date().toLocaleDateString(),
      to: new Date().toLocaleDateString()
    },
    {
      id: "728ed52f",
      title: "room 2",
      status: "accepted",
      from: new Date().toLocaleDateString(),
      to: new Date().toLocaleDateString()
    },
  ]
}
export default async function Reservations() {
  const data = await getData()
  return (
    <>
      <PageHeader title="Reservations" description="your reservations" />
      <DataTable columns={columns} data={data} />
    </>
  )
}
