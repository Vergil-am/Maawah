import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"



//TODO: I need to make it return the values.
type CounterProps = {
  title: string,
  value: number
}
export default function Counter({
  title, value
}: CounterProps) {
  const [Value, setValue] = useState(value)
  const Add = () => {
    setValue(Value + 1)
  }
  const Reduce = () => {
    if (Value === value) {
      return
    }
    setValue(Value - 1)
  }
  return (
    <div className="w-2/4">
      <Separator className="my-2" />
      <div className="flex items-center justify-between">
        <div className="flex-1">{title}</div>
        <div className="flex justify-around items-center flex-1">
          <Button disabled={Value == value} variant='outline' className="rounded-full" onClick={Reduce}><Minus /></Button>
          {Value}
          <Button variant='outline' className="rounded-full" onClick={Add}><Plus /></Button>
        </div>
      </div>
      <Separator className="my-2" />
    </div>
  )
}
