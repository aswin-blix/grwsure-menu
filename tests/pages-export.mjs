import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "/grwsure-menu";
const root = resolve("out");
const mime = {".html":"text/html",".js":"text/javascript",".css":"text/css",".webp":"image/webp",".ttf":"font/ttf",".woff2":"font/woff2",".txt":"text/plain"};
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
 assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
 console.log("PASS: repository subpath, images, fonts, JavaScript, menu, display picker, pricing, mobile width and no missing resources.");
}finally{
 await browser.close();
 await new Promise(resolve=>server.close(resolve));
}
