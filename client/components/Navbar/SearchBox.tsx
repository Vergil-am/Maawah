"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/daterange-picker";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DateRangeAtom } from "@/components/ui/daterange-picker";
import { useAtomValue } from "jotai";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/mobileDrawer";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { LocationMenu } from "./LocationMenu";


export default function SearchBox() {
  const [Location, setLocation] = useState<string | null>(null);
  const [Rooms, setRooms] = useState<string | null>(null);
  const date = useAtomValue(DateRangeAtom)

  const router = useRouter();

  const addSearchParams = () => {
    // I need to add more params
    const params = new URLSearchParams(window.location.search);
    if (Location) {
      params.set("location", Location);
    }
    if (Rooms) {
      params.set("rooms", Rooms);
    }
    if (date?.from && date.to) {
      params.set("from", date.from?.toISOString());
      params.set("to", date.to?.toISOString());
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="max-sm:hidden">
          <div className=" flex-shrink flex-grow-0 justify-start px-2">
            <div className="inline-block">
              <div className="inline-flex items-center max-w-full">
                <button
                  className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1 max-sm:w-40"
                  type="button"
                >
                  <div className="block flex-grow flex-shrink overflow-hidden">Start your search</div>
                  <div className="flex items-center justify-center relative  h-8 w-8 rounded-full">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        fill: "none",
                        height: "12px",
                        width: "12px",
                        stroke: "currentcolor",
                        strokeWidth: "5.33333",
                        overflow: "visible",
                      }}
                    >
                      <g fill="none">
                        <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side="top" className="rounded-xl grid justify-center grid-rows-1 grid-cols-3 max-sm:hidden">
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" className="rounded-full w-full">
                where
              </Button>

            </PopoverTrigger>
            <PopoverContent>
              <LocationMenu />
              <LocationMenu />
            </PopoverContent>

          </Popover>
          <DatePickerWithRange className="grid" />
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" className="rounded-full w-full">
                more
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Input placeholder="test" />
            </PopoverContent>
          </Popover>
        </SheetContent>
      </Sheet>
      <Drawer>
        <DrawerTrigger className="sm:hidden">
          <div className=" flex-shrink flex-grow-0 justify-start px-2">
            <div className="inline-block">
              <div className="inline-flex items-center max-w-full">
                <button
                  className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1 max-sm:w-40"
                  type="button"
                >
                  <div className="block flex-grow flex-shrink overflow-hidden">Start your search</div>
                  <div className="flex items-center justify-center relative  h-8 w-8 rounded-full">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        fill: "none",
                        height: "12px",
                        width: "12px",
                        stroke: "currentcolor",
                        strokeWidth: "5.33333",
                        overflow: "visible",
                      }}
                    >
                      <g fill="none">
                        <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent
          title="Search"
        >
          <div>
            <LocationMenu />
            <LocationMenu />
            <DatePickerWithRange />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
