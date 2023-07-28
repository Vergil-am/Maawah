import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <Card className="w-72 m-2.5 relative">
      <Skeleton className="h-48 w-full" />
      <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-2 w-[250px]" />
      </CardHeader>
      <Separator orientation="horizontal" className="mb-1" />
      <CardFooter className="flex justify-between  pt-3">
        <div className="flex mt-2 items-center">
          <Skeleton className="w-10 h-2" /> / <Skeleton className="w-10 h-2" />
        </div>
      </CardFooter>
      <div className="flex items-center absolute bottom-4 right-2">
        <Skeleton className="w-10 h-3 mr-2" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </Card>
  );
}
