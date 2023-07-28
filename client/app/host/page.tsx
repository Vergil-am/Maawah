"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Step1 from "@/components/host/Step1";
import Step2 from "@/components/host/Step2";
import Step3 from "@/components/host/Step3";
import Step4 from "@/components/host/Step4";
import Validate from "@/components/host/Validate";

const steps = [
  { label: "Property type" },
  { label: "Property details" },
  { label: "Ammenties" },
  { label: "confirmation" },
];
export default function Host() {
  const [progress, setProgress] = useState(0);
  function getSectionComponent() {
    switch (progress) {
      case 0:
        return <Step1 />;
      case (1 * 100) / steps.length:
        return <Step2 />;
      case (2 * 100) / steps.length:
        return <Step3 />;
      case (3 * 100) / steps.length:
        return <Step4 />;
      case (4 * 100) / steps.length:
        return <Validate />;
    }
  }
  console.log(progress);

  return (
    <main>
      <div>
        <Progress value={progress} className="w-[60%]" />
      </div>
      <div>{getSectionComponent()}</div>
      <div className="flex justify-around items-end">
        <Button
          disabled={progress > 0 ? false : true}
          onClick={() => setProgress(progress - 100 / steps.length)}
        >
          Previews
        </Button>
        {progress < 100 ? (
          <Button onClick={() => setProgress(progress + 100 / steps.length)}>Next</Button>
        ) : (
          <Button onClick={() => console.log("validated")}>validate</Button>
        )}
      </div>
    </main>
  );
}
