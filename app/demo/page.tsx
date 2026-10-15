import type { Metadata } from "next";
import MenuDemo from "./menu-demo";
import "./menu.css";
export const metadata: Metadata={
 title:"Kaveri Kitchen | Scan-to-menu demo",
 description:"Explore sample special dishes, prices, ratings and today's offer in the GRWSURE QR menu demo."
};
export default function DemoPage(){return <MenuDemo/>}
