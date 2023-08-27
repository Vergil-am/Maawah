import HostNavbar from "@/components/Navbar/HostNavbar"

type HostLayoutProps = {
  children: React.ReactNode,
  params: any
}
export default function HostLayout({ children }: HostLayoutProps) {
  return (
    <>
      <HostNavbar />
      <main className="container relative">{children}</main>
    </>
  )
}
