import CardSkeleton from "@/components/CardSkeleton";


export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  const Cards = () => {
    return Array.from({ length: 20 }, (_, i) => <CardSkeleton key={i} />);
  };
  return (
    <main className="flex flex-wrap justify-center">
      {Cards()}
    </main>
  );
}
