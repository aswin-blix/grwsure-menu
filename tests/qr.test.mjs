import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PNG} from "pngjs";
import jsQR from "jsqr";
import { DEMO_MENU_URL, todayOffer, demoDishes } from "../lib/demo-menu.mjs";
test("generated QR decodes to the published demo menu",()=>{
 const png=PNG.sync.read(readFileSync("public/images/demo-qr.png"));
 const decoded=jsQR(new Uint8ClampedArray(png.data),png.width,png.height);
 assert.ok(decoded,"QR must be decodable");
 assert.equal(decoded.data,DEMO_MENU_URL);
 assert.equal(new URL(decoded.data).pathname,"/grwsure-menu/demo/");
});
test("offer reflects the actual sample dishes",()=>{
 const {offer}=JSON.parse(readFileSync("content/menus/standard.json","utf8"));
 assert.ok(Array.isArray(offer.itemIds)&&offer.itemIds.length>0,"An offer needs at least one dish");
 let regularPrice=0;
 for(const id of offer.itemIds){
  const dish=demoDishes.find(item=>item.id===id);
  assert.ok(dish,"Offer references an existing dish: "+id);
  assert.ok(Number.isFinite(dish.price)&&dish.price>=0);
  regularPrice+=dish.price;
 }
 assert.equal(todayOffer.regularPrice,regularPrice);
 assert.equal(todayOffer.price,offer.price);
 assert.ok(Number.isFinite(todayOffer.price)&&todayOffer.price>=0);
 assert.ok(todayOffer.price<=regularPrice,"An offer must not show negative savings");
});
