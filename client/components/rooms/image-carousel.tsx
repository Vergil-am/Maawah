"use client";

import * as React from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
// import { Icons } from "@/components/icons";

interface ImageCarouselProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  images: { name: string; url: string }[];
}

export function ImageCarousel({ images, className, ...props }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = React.useState(0);

  function getNextImage() {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }

  function getPreviousImage() {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  }

  return (
    <div className={cn("flex flex-col space-y-4", className)} {...props}>
      <div className="relative h-full w-full">
        <div className="relative h-full w-full overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <div className="absolute inset-0 z-10 bg-black/15" />
            <img
              // src={images[currentImage]?.url ?? "https://th.bing.com/th/id/R.12d0fc4905551fb8949f19bd771a932d?rik=%2bc03egnQSijdJg&pid=ImgRaw&r=0"}
              src={
                images[currentImage].url ??
                "https://th.bing.com/th/id/R.12d0fc4905551fb8949f19bd771a932d?rik=%2bc03egnQSijdJg&pid=ImgRaw&r=0"
              }
              // alt={images[currentImage]?.name ?? "Carousel image"}
              // fill
              className="object-cover"
              alt={images[currentImage].name}
            />
          </AspectRatio>
        </div>
        <div className="absolute left-0 top-0 z-20 h-full w-full px-4">
          <div className="flex h-full w-full items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 transition-transform hover:scale-110 hover:bg-transparent active:scale-95"
              onClick={getPreviousImage}
            >
              <ChevronLeft className="h-10 w-10 scale-125" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-100 transition-transform hover:scale-110 hover:bg-transparent active:scale-95"
              onClick={getNextImage}
            >
              <ChevronRight className="h-10 w-10 scale-125" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2.5">
        {images.map((image, index) => (
          <PaginationCard
            key={index}
            index={index}
            image={image}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            getNextImage={getNextImage}
            getPreviousImage={getPreviousImage}
          />
        ))}
      </div>
    </div>
  );
}

interface PaginationCardProps {
  index: number;
  image: { name: string; url: string };
  currentImage: number;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
  getNextImage: () => void;
  getPreviousImage: () => void;
}

function PaginationCard({
  index,
  image,
  currentImage,
  setCurrentImage,
  getNextImage,
  getPreviousImage,
}: PaginationCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-28 w-28 rounded-none shadow-sm hover:bg-transparent"
      onClick={() => setCurrentImage(index)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          getPreviousImage();
        } else if (e.key === "ArrowRight") {
          getNextImage();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // This is needed to make the first image focusable
      tabIndex={index === 0 ? 0 : -1}
    >
      <AspectRatio ratio={1 / 1}>
        <div className="absolute inset-0 z-10 bg-black/50" />
        <img
          src={image.url}
          // alt={image.name}
          // fill
          className={cn(
            "object-cover",
            (currentImage === index || isHovered) && "ring-1 ring-primary",
          )}
        />
      </AspectRatio>
      <span className="sr-only">Image title</span>
    </Button>
  );
}
