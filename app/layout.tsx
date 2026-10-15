import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: [
    {path:"../public/fonts/font-0.ttf",weight:"400",style:"normal"},
    {path:"../public/fonts/font-1.ttf",weight:"500",style:"normal"},
    {path:"../public/fonts/font-2.ttf",weight:"600",style:"normal"},
    {path:"../public/fonts/font-3.ttf",weight:"700",style:"normal"}
  ],
  variable:"--font-dm-sans",display:"swap"
});
const serif = localFont({
  src:[
    {path:"../public/fonts/font-4.ttf",weight:"400",style:"italic"},
    {path:"../public/fonts/font-5.ttf",weight:"400",style:"normal"}
  ],
  variable:"--font-dm-serif",display:"swap"
});
export const metadata: Metadata = {
 title: "GRWSURE | One scan. A whole new guest experience.",
 description: "Explore Smart QR Menu for restaurants and hotels: digital menus, dish reviews, WhatsApp thank-you messages and simple pricing.",
 robots: { index: false, follow: false }
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
 return <html lang="en" className={sans.variable+" "+serif.variable}><body>{children}</body></html>;
}
