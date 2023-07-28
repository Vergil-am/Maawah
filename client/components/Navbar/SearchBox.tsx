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
    <Popover>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm text-muted-foreground">Choose your prefrences.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="Location">Location</Label>
              <Input
                id="Location"
                placeholder="e.g. Town/Postecode ..."
                // defaultValue="Place holder"
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="Rooms">Rooms: </Label>
              <Input
                id="Rooms"
                type="number"
                min={1}
                placeholder="Any"
                // defaultValue="1"
                onChange={(e) => setRooms(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <DatePickerWithRange className="" />
            </div>
          </div>
          <Button onClick={addSearchParams}>search</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
