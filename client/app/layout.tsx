import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider"

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
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
        {children}
        <Toaster />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
