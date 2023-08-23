import { Progress } from "@/components/ui/progress";

type FooterProps = {
  children: React.ReactNode,
  progress: number
}
export default function Footer({ children, progress }: FooterProps) {
  return (
    <>
      <Progress value={progress} />
      <div className='h-[10vh] w-full flex relative'>
        {children}
      </div>
    </>
  )
}
