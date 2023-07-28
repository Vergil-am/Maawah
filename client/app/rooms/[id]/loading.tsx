import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from "@/components/ui/card";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.

  return (
    <main className="flex flex-wrap justify-center">
      <div className="w-screen flex flex-wrap">
        <div className="w-3/5 max-lg:w-full ">
          <Skeleton className="w-full h-full lg:h-3/4 lg:m-3" />
        </div>
        <div className="w-2/5 flex flex-col justify-center items-center max-lg:w-screen mt-2 ">
          <Card className="max-md:w-2/4 max-lg:w-2/5 lg:fixed lg:w-1/3 xl:w-1/4">
            <CardHeader className="flex items-center">
              <CardTitle>
                <Skeleton className="h-4 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center flex-col">
              <ul>
                <li className="m-2">
                  <Skeleton className="h-4 w-[200px]" />
                </li>
                <li className="m-2">
                  <Skeleton className="h-4 w-[200px]" />
                </li>
                <li className="m-2">
                  <Skeleton className="h-4 w-[200px]" />
                </li>
                <li className="m-2">
                  <Skeleton className="h-4 w-[200px]" />
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-center w-full">
              <Skeleton className="h-6 w-2/5 m-2" />
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
