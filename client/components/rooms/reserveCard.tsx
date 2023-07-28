"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/daterange-picker";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { useRouter, useParams } from "next/navigation";
import Auth from "@/lib/getToken";
import { MakeRequest } from "@/lib/fetcher";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function ReserveCard({ props }: any) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    to: addDays(new Date(), 15),
  });
  const router = useRouter();
  const params = useParams();
  const { isLoggedin } = Auth();

  const GetDateRange = (range: DateRange | undefined) => {
    setDate(range);
  };

  const Submit = async () => {
    try {
      const options = {
        method: "put",
        withCredentials: true,
        data: {
          from : date?.from?.toISOString(),
          to : date?.to?.toISOString(),
        },
      };
      const res = await MakeRequest(
        `http://localhost:5000/properties/reservation/${params.id}`,
        options
      );
      toast({
        title: `Reservation successful`,
        description: `${res}`,
        action: <ToastAction altText="Goto wishlist to undo">Undo</ToastAction>,
      });
      console.log(res);
    } catch (err) {
      throw new Error("can't make reservation");
    }
  };
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button> Reserve</Button>
      </SheetTrigger>
      <SheetContent className="mt-20 max-sm:w-screen max-md:w-3/4 max-lg:w-3/5">
        {isLoggedin ? (
          <>
            <SheetHeader className="flex justify-center">
              <SheetTitle>Reservation</SheetTitle>
              <SheetDescription>Make your reservation now</SheetDescription>
            </SheetHeader>

            <Card className="m-2">
              <CardHeader>
                <CardTitle className="flex justify-center">Reserve Now</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-center">
                <DatePickerWithRange
                  className="flex justify-center z-50"
                  GetDateRange={GetDateRange}
                  date={date}
                />
                <Button onClick={Submit}>Reserve</Button>
              </CardContent>
              <Separator />
              <CardFooter className="flex flex-col justify-center">
                <div className="flex justify-between w-full">
                  <p>Price: </p>
                  <p>{props.price} $ /Night </p>
                </div>
                <div className="flex justify-between w-full">
                  <p>Total Price: </p>
                  <p>500$</p>
                </div>
              </CardFooter>
            </Card>
          </>
        ) : (
          <>
            <Button onClick={() => router.push("/login")}>Login</Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
