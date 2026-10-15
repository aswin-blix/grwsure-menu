import QRCode from "qrcode";
import { DEMO_MENU_URL } from "../lib/demo-menu.mjs";
const options={errorCorrectionLevel:"M",margin:4,width:1000,color:{dark:"#112e53",light:"#ffffff"}};
await QRCode.toFile("public/images/demo-qr.svg",DEMO_MENU_URL,{...options,type:"svg"});
await QRCode.toFile("public/images/demo-qr.png",DEMO_MENU_URL,{...options,type:"png"});
console.log("Generated QR for "+DEMO_MENU_URL);

// Each collection entry owns a permanent, independently scannable menu URL.
const {eventMenus,eventMenuUrl}=await import("../lib/event-menus.mjs");
for(const menu of eventMenus){
 const url=eventMenuUrl(menu.slug);
 await QRCode.toFile("public/images/"+menu.slug+"-qr.svg",url,{...options,type:"svg"});
 await QRCode.toFile("public/images/"+menu.slug+"-qr.png",url,{...options,type:"png"});
 console.log("Generated QR for "+url);
}
