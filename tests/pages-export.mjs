import { createServer } from "node:http";
import { readFile, stat, mkdir } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import assert from "node:assert/strict";
import { PNG } from "pngjs";
import jsQR from "jsqr";
import { chromium, expect } from "@playwright/test";
import {eventMenus, eventMenuUrl} from "../lib/event-menus.mjs";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "/grwsure-menu";
const root = resolve("out");
const mime = {".svg":"image/svg+xml",".png":"image/png",".html":"text/html",".js":"text/javascript",".css":"text/css",".webp":"image/webp",".ttf":"font/ttf",".woff2":"font/woff2",".txt":"text/plain"};
const server = createServer(async(req,res)=>{
 try{
  const path=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  if(!path.startsWith(prefix+"/")){res.writeHead(404);res.end();return;}
  let file=resolve(root,path.slice(prefix.length+1)||"index.html");
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  if((await stat(file)).isDirectory())file=resolve(file,"index.html");
  res.setHeader("Content-Type",mime[extname(file)]||"application/octet-stream");
  res.end(await readFile(file));
 }catch{res.writeHead(404);res.end();}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const address=server.address();
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||"msedge"});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const failures=[];const errors=[];
 page.on("response",r=>{if(r.status()>=400&&!r.url().endsWith("/favicon.ico"))failures.push(r.url())});
 page.on("pageerror",e=>errors.push(e.message));
 await page.goto("http://127.0.0.1:"+address.port+prefix+"/",{waitUntil:"networkidle"});
 await page.evaluate(()=>document.fonts.ready);
 await expect(page.getByRole("heading",{level:1})).toContainText("One little scan");
 await expect(page.locator(".hero-art img")).toHaveAttribute("src",prefix+"/images/hero.webp");
 await page.getByRole("button",{name:"Meals",exact:true}).click();
 await expect(page.locator(".dish")).toHaveCount(2);
 await page.getByRole("button",{name:"03 Entrance A-frame"}).click();
 await expect(page.locator(".display-image img")).toHaveAttribute("src",prefix+"/images/entrance.webp");
 await page.locator(".display-image img").evaluate(img=>img.decode());
 await page.getByRole("button",{name:/Yearly/}).click();
 await expect(page.locator(".plan-price").nth(1)).toHaveText("₹9,990/year");
 assert.equal(await page.evaluate(()=>document.fonts.check('16px '+getComputedStyle(document.body).fontFamily.split(",")[0])),true);
 await page.setViewportSize({width:390,height:844});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);

 await page.locator("#scan-demo").scrollIntoViewIfNeeded();
 await expect(page.locator(".live-qr-card img")).toBeVisible();
 const qrPixels=PNG.sync.read(await page.locator(".live-qr-card img").screenshot());
 const decoded=jsQR(new Uint8ClampedArray(qrPixels.data),qrPixels.width,qrPixels.height);
 assert.equal(decoded?.data,"https://aswin-blix.github.io/grwsure-menu/demo/","Rendered QR must scan to the real demo URL");
 await page.getByRole("link",{name:"Open the demo menu",exact:true}).click();
 await page.waitForLoadState("networkidle");
 await expect(page).toHaveURL(new RegExp(prefix+"/demo/$"));
 await expect(page.getByRole("heading",{level:1})).toContainText("Kaveri");
 await expect(page.locator(".special-dish")).toHaveCount(2);
 await expect(page.locator(".special-dish").first()).toContainText("₹280");
 await expect(page.locator(".today-offer")).toContainText("₹299");
 await expect(page.locator(".restaurant-dish")).toHaveCount(8);
 await page.getByRole("searchbox",{name:"Search the menu"}).fill("paneer");
 await expect(page.locator(".restaurant-dish")).toHaveCount(1);
 await page.getByLabel("Vegetarian only").check();
 await page.getByRole("button",{name:"Biryani",exact:true}).click();
 await expect(page.getByRole("status")).toContainText("No dishes found");
 await page.getByRole("button",{name:"Show all dishes",exact:true}).click();
 await expect(page.locator(".restaurant-dish")).toHaveCount(8);
 await page.getByLabel("Vegetarian only").check();
 await expect(page.locator(".restaurant-dish")).toHaveCount(3);
 await page.getByLabel("Vegetarian only").uncheck();
 await expect(page.locator("form, textarea")).toHaveCount(0);
 await mkdir("test-results",{recursive:true});
 await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:"test-results/demo-desktop.png",fullPage:true});
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,"Demo must fit "+width+"px");
 }
 await page.screenshot({path:"test-results/demo-mobile.png",fullPage:true});
 await page.getByRole("link",{name:"Back to the QR presentation"}).click();
 await expect(page).toHaveURL(new RegExp(prefix+"/#scan-demo$"));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,"Presentation QR must fit 320px");
 await expect(page.locator(".event-qr-card")).toHaveCount(3);
 for(const menu of eventMenus){
  const destination=prefix+"/menus/"+menu.slug+"/";
  const card=page.locator(".event-qr-card").filter({has:page.locator('a[href="'+destination+'"]')});
  await expect(card).toHaveCount(1);
  const qr=card.locator("img");
  await qr.scrollIntoViewIfNeeded();
  await qr.evaluate(img=>img.decode());
  const pixels=PNG.sync.read(await qr.screenshot());
  const eventCode=jsQR(new Uint8ClampedArray(pixels.data),pixels.width,pixels.height);
  assert.equal(eventCode?.data,eventMenuUrl(menu.slug),menu.slug+" rendered QR must scan to its own menu");
 }
 for(const menu of eventMenus){
  const response=await page.goto("http://127.0.0.1:"+address.port+prefix+"/menus/"+menu.slug+"/",{waitUntil:"networkidle"});
  assert.equal(response.status(),200);
  await expect(page.locator(".event-menu")).toHaveAttribute("data-theme",menu.theme);
  await expect(page.getByRole("heading",{level:1})).toHaveText(menu.title);
  const allDishes=menu.sections.flatMap(section=>section.items);
  await expect(page.locator(".event-dish")).toHaveCount(allDishes.length);
  const search=page.getByRole("searchbox",{name:"Search this menu"});
  await search.fill("zzzx-no-such-dish-zzzx");
  await expect(page.locator(".event-dish")).toHaveCount(0);
  await expect(page.getByRole("status")).toBeVisible();
  await page.getByRole("button",{name:"Clear filters",exact:true}).click();
  await expect(search).toHaveValue("");
  await expect(page.locator(".event-dish")).toHaveCount(allDishes.length);
  await search.fill("  "+allDishes[0].name.toUpperCase()+"  ");
  assert.ok(await page.locator(".event-dish").count()>0,"Search should trim whitespace and ignore case");
  for(const href of await page.locator(".event-categories a").evaluateAll(links=>links.map(link=>link.getAttribute("href")))) await expect(page.locator(href)).toHaveCount(1);
  await search.fill("");
  await page.getByRole("checkbox",{name:"Vegetarian only"}).check();
  await expect(page.locator(".event-dish")).toHaveCount(allDishes.filter(dish=>dish.veg===true).length);
  await page.getByRole("checkbox",{name:"Vegetarian only"}).uncheck();
  await expect(page.locator(".event-dish")).toHaveCount(allDishes.length);
  await expect(page.locator("form, textarea")).toHaveCount(0);
  await page.setViewportSize({width:1440,height:1000});
  await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
  await page.screenshot({path:"test-results/"+menu.slug+"-desktop.png",fullPage:true});
  await page.setViewportSize({width:320,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,menu.slug+" menu must fit 320px");
  await page.screenshot({path:"test-results/"+menu.slug+"-mobile.png",fullPage:true});
 }
 assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
 console.log("PASS: Pages asset paths, rendered QR decoding, demo menu, specials, offers, ratings, search/category/vegetarian filters, empty state, dedicated Christmas/Indian/Diwali themes and QR codes, 320px layout and no missing resources.");
}finally{
 await browser.close();
 await new Promise(resolve=>server.close(resolve));
}
