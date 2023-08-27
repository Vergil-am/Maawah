import Footer from "@/components/host/create/footer"

type Props = {
  children: React.ReactNode,
  params: {
    step: string
  }
}
export default function NewLayout({ children, params }: Props) {
  return (
    <>
      {children}
      <Footer step={params.step} />
    </>
  )
}
