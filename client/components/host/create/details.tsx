"use client"
import Counter from "./counter";



export default function Details() {
  return (
    <div className=" h-full flex flex-col justify-center items-center ">
      <Counter title="Bedrooms" value={1} />
      <Counter title="Bathrooms" value={1} />
      <Counter title="Garage" value={0} />
    </div>
  )
}
