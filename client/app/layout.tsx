import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/lib/provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata = {
  title: "Mawaah",
  description: "Rent your dream vacation home now",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontSans.className}>
      <body className="h-screen  bg-background overflow-x-hidden">
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
