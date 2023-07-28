"use client";
import { Input } from "@/components/ui/input";

export default function Step4() {
  return (
    <main className="h-[60vh]">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Pictures
      </h2>
      <Input type="file" />
    </main>
  );
}
