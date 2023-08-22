import Navbar from "@/components/Navbar/navbar";
import "../globals.css";



export const metadata = {
  title: "Mawaah",
  description: "Rent your dream vacation home now",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mt-20">{children}</div>
    </>
  );
}
