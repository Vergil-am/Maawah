"use client"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Listing = {
  id: string
  title: string
  status: "available" | "reserved"
  location: string
}

export const columns: ColumnDef<Listing>[] = [

  {
    accessorKey: "title",
    header: "Listing",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
]

