"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { atom, useAtom } from 'jotai'
import { ImageMinusIcon, ImagePlus } from 'lucide-react'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

export const ImagesAtom = atom<string[]>([])

export default function DropeZone() {
  const [Images, setImages] = useAtom(ImagesAtom)
  const { toast } = useToast()
  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()
      reader.onload = () => {
        setImages((state: string[]) => [...state, reader.result as string])
      }
      reader.readAsDataURL(file)
    });

    if (rejectedFiles.length > 0) {
      console.log()
      toast({
        title: rejectedFiles[0].errors[0].code,
        description: rejectedFiles[0].errors[0].message.split('/')[0],
        variant: 'destructive'
      })
    }


  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })
  return (
    <>
      <section className='w-full h-[50vh] flex justify-center items-center'>
        <div {...getRootProps()} className=' rounded-md border border-dashed border-muted-foreground h-[300px] w-[500px] grid place-items-center' >
          <Input  {...getInputProps()} />
          {isDragActive ?
            <p>Drop files here</p> :
            <>
              <div className='grid place-items-center gap-4'>
                <ImagePlus size={50} className='text-muted-foreground' />
                <p className='scroll-m-20 text-xl font-semibold tracking-tight'>Drag 'n' drop your photos here</p>
                <p className='pl-6 italic text-muted-foreground'>Select up to 5 photos</p>
              </div>
              <p className='font-semibold text-lg underline'>click to select files</p>
            </>
          }
        </div>

      </section>
      {
        Images.length > 0 &&
        <section className='flex gap-4 flex-wrap justify-center p-6'>
          {Images.map((image: string, index: number) => {
            return (
              <div className='w-[500px] h-[300px] rounded-lg relative' key={index}>
                <Button
                  onClick={() => setImages(
                    Images.filter((item: string, i: number) => i != index)
                  )}
                  variant='secondary'
                  className='absolute right-2 top-2 rounded-full' ><ImageMinusIcon /></Button>
                <Image
                  placeholder='blur'
                  blurDataURL={image}
                  fill
                  src={image}
                  alt={`your place's image ${index}`} />
              </div>
            )
          })}
        </section>
      }
    </>

  )
}
