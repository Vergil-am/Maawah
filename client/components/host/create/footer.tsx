'use client'
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { MakeRequest } from "@/lib/fetcher";
import { atom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

type footerProps = {
  step: string
}
type CreateListingType = {
  title?: string,
  description?: string,
  type?: string,
  price?: number,
  bedrooms: number,
  bathrooms: number,
  garages: number,
  images: string[],
  address?: string,
  lon?: number,
  lat?: number,
}
const Steps = ['create', 'type', 'details', 'description', 'location', 'images']
export const CreateListingAtom = atom<CreateListingType>({
  bedrooms: 1,
  bathrooms: 1,
  garages: 0,
  images: []
})

export default function Footer({ step }: footerProps) {
  const Listing = useAtomValue(CreateListingAtom)
  console.log(Listing)
  const { toast } = useToast()
  const router = useRouter()
  const index = Steps.indexOf(step)
  function handleBack() {
    if (index > 0) {
      router.push(Steps[index - 1])
    }

  }
  async function handleNext() {
    if (index == 1) {
      if (Listing.type) {
        router.push(Steps[index + 1])
      }
      else (
        toast({
          title: 'you need to choose one before moving forward',
        })
      )
    }
    else if (index == 3) {
      if (Listing.title && Listing.description) {
        router.push(Steps[index + 1])
      }
      else {
        toast({
          title: 'title and description cannot be empty'
        })
      }
    }
    else if (index == 4) {
      if (Listing.address && Listing.lat && Listing.lon) {
        router.push(Steps[index + 1])
      } else {
        toast({
          title: 'you need to choose a location'
        })

      }
    }
    else if (index == Steps.length - 1) {
      if (Listing.images.length > 0) {
        //TODO: I need to send the request to the server or go to the next Steps
        try {
          const options = {
            method: "post",
            withCredentials: true,
            data: Listing
          };
          const res = await MakeRequest('http://localhost:5000/rooms', options)
          console.log(res)
          console.log('success')
        } catch (error) {
          console.log(error)

        }
      }
      else {
        toast({
          title: 'you need to add images'
        })
      }
    }
    else {
      router.push(Steps[index + 1])
    }


  }
  //TODO: create buttons that use Step[+1] when pressed and Step[-1] or Links
  return (
    <div className="fixed w-screen left-0 bottom-0 bg-primary-foreground">
      <div className="w-[80%] mx-[10%]">
        <Progress value={index / (Steps.length - 1) * 100} className="my-4" />
        <div className='mb-2 w-full flex relative justify-between'>
          <Button variant='link'
            disabled={index == 0}
            onClick={handleBack}
          >Back</Button>
          <Button
            onClick={handleNext}
          >{
              index == 0 ? 'Start' : index == Steps.length - 1 ? 'Finish' : 'Next'
            }</Button>
        </div>
      </div>
    </div>
  )
}
