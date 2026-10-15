import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PNG} from "pngjs";
import jsQR from "jsqr";
import {eventMenus, eventMenuUrl} from "../lib/event-menus.mjs";

test("event menus have unique safe routes and valid menu content",()=>{
 assert.deepEqual(eventMenus.map(menu=>menu.slug).sort(),["christmas","diwali","indian-special"]);
 assert.equal(new Set(eventMenus.map(menu=>menu.slug)).size,eventMenus.length);
 for(const menu of eventMenus){
  assert.match(menu.slug,/^[a-z]+(?:-[a-z]+)*$/);
  assert.ok(menu.title.trim());
  assert.ok(["christmas","indian","diwali"].includes(menu.theme));
  assert.ok(menu.sections.length>0);
  const dishes=menu.sections.flatMap(section=>{
   assert.ok(section.title.trim());
   assert.ok(section.items.length>0);
   return section.items;
  });
  assert.ok(dishes.length>0);
  for(const dish of dishes){
   assert.ok(dish.name.trim());
   if(dish.price!==undefined){
    assert.equal(typeof dish.price,"number");
    assert.ok(Number.isFinite(dish.price)&&dish.price>=0);
   }
   if(dish.veg!==undefined)assert.equal(typeof dish.veg,"boolean");
  }
 }
});

test("Christmas buffet preserves reference pricing",()=>{
 const christmas=eventMenus.find(menu=>menu.slug==="christmas");
 assert.deepEqual(christmas.pricing.map(price=>price.value),["BD 6","BD 3"]);
});

for(const menu of eventMenus){
 test(menu.slug+" QR decodes to its dedicated published menu",()=>{
  const png=PNG.sync.read(readFileSync("public/images/"+menu.slug+"-qr.png"));
  const decoded=jsQR(new Uint8ClampedArray(png.data),png.width,png.height);
  assert.ok(decoded,"QR must be decodable");
  const expected="https://aswin-blix.github.io/grwsure-menu/menus/"+menu.slug+"/";
  assert.equal(eventMenuUrl(menu.slug),expected);
  assert.equal(decoded.data,expected);
  const svg=readFileSync("public/images/"+menu.slug+"-qr.svg","utf8");
  assert.match(svg,/<svg\b/);
 });
}
test("unknown event menus cannot produce a published QR destination",()=>{
 assert.throws(()=>eventMenuUrl("unknown"),/Unknown event menu/);
 assert.throws(()=>eventMenuUrl("../christmas"),/Unknown event menu/);
});
