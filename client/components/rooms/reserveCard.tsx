"use client"
import React from 'react'
import { Card, CardHeader, CardFooter, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BedSingle, Bath, Warehouse, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RentalCardProps } from '@/interfaces/CardProps';
import { DatePickerWithRange, DateRangeAtom } from '../ui/daterange-picker';
import { useAtomValue } from 'jotai';
import { MakeRequest } from '@/lib/fetcher';
import { isLoggedinAtom } from '../Navbar/ProfileMenu';
import { toast } from '../ui/use-toast';

export default function ReserveCard({ props }: RentalCardProps) {
  const isLoggedin = useAtomValue(isLoggedinAtom)
  const dateRange = useAtomValue(DateRangeAtom)
  async function onSumbmit() {
    if (isLoggedin) {
      try {
        const options = {
          method: "post",
          withCredentials: true,
          data: {
            from: dateRange?.from,
            to: dateRange?.to

          },
        };
        const res = await MakeRequest(`http://localhost:5000/reservation/${props.id}`, options);
        toast({
          title: `${props.title}`,
          description: "reservation created",
        });

      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div className="w-2/5 flex flex-col justify-center items-center max-lg:w-screen mt-2 ">
      <Card className="max-md:w-full max-lg:w-4/5 lg:fixed lg:w-1/3 xl:w-1/4">
        <CardHeader className="flex items-center">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription className='flex '><MapPin size={16} className='mr-2' /> {props.address}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center flex-col">
          <ul className="max-lg:flex max-lg:justify-between">
            <li className="flex m-2 max-lg:flex-col">
              <BedSingle color="#000000" className="mr-2" /> Bedrooms : 4
            </li>

            <li className="flex m-2 max-lg:flex-col">
              <Bath color="#000000" className="mr-2" /> Bathrooms : 1
            </li>
            <li className="flex m-2 max-lg:flex-col">
              <Warehouse color="#000000" className="mr-2" /> Garages : yes
            </li>
            <li className="flex m-2 max-lg:flex-col">
              <Home color="#000000" className="mr-2" /> Size : 200 m2
            </li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col items-center w-full">
          <h1>{props.price} $ / Night</h1>
          <DatePickerWithRange />
          <Button onClick={onSumbmit}> Reserve Now</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
