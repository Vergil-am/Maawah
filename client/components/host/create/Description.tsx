'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useAtom } from "jotai";
import { CreateListingAtom } from "./footer";

export default function Description() {
  const [Listing, setListing] = useAtom(CreateListingAtom)


  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-2/4 h-2/4">
        <CardContent >
          <div>
            <Label>Title</Label>
            <Input
              placeholder="test title"
              className="w-full"
              onChange={(e) => {
                e.preventDefault;
                setListing({
                  ...Listing,
                  title: e.target.value
                })
              }} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              className="h-full w-full"
              placeholder="Describe your place ..."
              onChange={(e) => {
                e.preventDefault;
                setListing({
                  ...Listing,
                  description: e.target.value
                })
              }}
            />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              placeholder="1000"
              type="number"
              onChange={(e) => {
                e.preventDefault;
                setListing({
                  ...Listing,
                  price: Number(e.target.value)
                })
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
