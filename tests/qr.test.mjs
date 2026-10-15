import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PNG} from "pngjs";
import jsQR from "jsqr";
import { DEMO_MENU_URL, todayOffer } from "../lib/demo-menu.mjs";
test("generated QR decodes to the published demo menu",()=>{
 const png=PNG.sync.read(readFileSync("public/images/demo-qr.png"));
 const decoded=jsQR(new Uint8ClampedArray(png.data),png.width,png.height);
 assert.ok(decoded,"QR must be decodable");
 assert.equal(decoded.data,DEMO_MENU_URL);
 assert.equal(new URL(decoded.data).pathname,"/grwsure-menu/demo/");
});
test("offer reflects the actual sample dishes",()=>{
 assert.equal(todayOffer.regularPrice,340);
 assert.equal(todayOffer.regularPrice-todayOffer.price,41);
});
