"use client"
import Counter from "./counter";



export default function Details() {
  return (
    <>

      <Counter title="Bedrooms" value={1} />
      <Counter title="Bathrooms" value={1} />
      <Counter title="Garage" value={0} />


    </>
  )
}
