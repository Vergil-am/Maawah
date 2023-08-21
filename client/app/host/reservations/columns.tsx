"use client"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reservation = {
  id: string
  title: string
  status: "pending" | "accepted" | "rejected"
  from: string
  to: string
}

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "title",
    header: "Reservation",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
]

