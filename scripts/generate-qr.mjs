import QRCode from "qrcode";
import { DEMO_MENU_URL } from "../lib/demo-menu.mjs";
const options={errorCorrectionLevel:"M",margin:4,width:1000,color:{dark:"#112e53",light:"#ffffff"}};
await QRCode.toFile("public/images/demo-qr.svg",DEMO_MENU_URL,{...options,type:"svg"});
await QRCode.toFile("public/images/demo-qr.png",DEMO_MENU_URL,{...options,type:"png"});
console.log("Generated QR for "+DEMO_MENU_URL);
