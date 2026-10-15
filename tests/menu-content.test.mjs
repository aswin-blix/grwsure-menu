import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {eventMenus} from "../lib/event-menus.mjs";
import {demoDishes,specials,todayOffer} from "../lib/demo-menu.mjs";
const standard=JSON.parse(readFileSync("content/menus/standard.json","utf8"));
function checkDish(dish){
 assert.ok(dish.name.trim());
 assert.equal(typeof dish.image,"string");
 assert.equal(typeof dish.imageAlt,"string");
 if(dish.image){
  assert.match(dish.image,/^\/images\/menu\/[a-zA-Z0-9_/-]+\.(?:png|jpe?g|webp|avif|svg)$/);
  assert.ok(existsSync("public"+dish.image),"Upload the image before publishing: "+dish.image);
 }
}
test("editable menu files provide every dish with a photo field",()=>{
 for(const dish of demoDishes)checkDish(dish);
 for(const menu of eventMenus){
  assert.equal(new Set(menu.sections.map(section=>section.title)).size,menu.sections.length);
  for(const section of menu.sections){
   assert.equal(new Set(section.items.map(dish=>dish.name)).size,section.items.length);
   for(const dish of section.items)checkDish(dish);
  }
 }
});
test("standard menu references reuse source dishes and accurate offer prices",()=>{
 const ids=standard.dishes.map(dish=>dish.id);
 assert.equal(new Set(ids).size,ids.length);
 for(const dish of standard.dishes){
  assert.ok(dish.id&&dish.category&&dish.name);
  assert.ok(Number.isFinite(dish.price)&&dish.price>=0);
 }
 for(const id of [...standard.specialIds,...standard.offer.itemIds])assert.ok(ids.includes(id));
 assert.equal(specials.length,standard.specialIds.length);
 assert.ok(specials.every(dish=>demoDishes.includes(dish)));
 assert.equal(todayOffer.regularPrice,standard.offer.itemIds.reduce((total,id)=>total+standard.dishes.find(dish=>dish.id===id).price,0));
});
test("every menu category contains exactly three dishes",async()=>{
 const {menu:previewDishes}=await import("../lib/content.mjs");
 for(const dishes of [demoDishes,previewDishes]){
  for(const category of new Set(dishes.map(dish=>dish.category))){
   assert.equal(dishes.filter(dish=>dish.category===category).length,3,category+" must contain three dishes");
  }
 }
 for(const menu of eventMenus){
  for(const section of menu.sections)assert.equal(section.items.length,3,menu.slug+" / "+section.title+" must contain three dishes");
 }
});
