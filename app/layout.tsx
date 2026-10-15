import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "GRWSURE | One scan. A whole new guest experience.",
 description: "Explore Smart QR Menu for restaurants and hotels: digital menus, dish reviews, WhatsApp thank-you messages and simple pricing.",
 robots: { index: false, follow: false }
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
 return <html lang="en"><body>{children}</body></html>;
}
