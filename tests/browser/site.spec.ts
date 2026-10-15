import { test, expect } from "@playwright/test";
test("guest demo, display picker and billing work",async({page})=>{
 const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/");
 await expect(page.getByRole("heading",{level:1})).toContainText("One little scan");
 await page.locator("#demo").scrollIntoViewIfNeeded();
 await page.getByRole("button",{name:"Preview the thank-you"}).click();
 await expect(page.getByRole("status")).toContainText("Choose a star rating");
 await page.getByRole("button",{name:"Meals",exact:true}).click();
 await expect(page.locator(".dish")).toHaveCount(2);
 await page.getByLabel("Veg only").check();
 await expect(page.locator(".dish")).toHaveCount(1);
 await expect(page.locator(".dish")).toContainText("South Indian Meals");
 await page.getByRole("button",{name:"1 star",exact:true}).click();
 await page.getByRole("button",{name:"Preview the thank-you"}).click();
 await expect(page.getByRole("status")).toContainText("1-star feedback");
 await expect(page.getByRole("status")).toContainText("No message was sent");
 await page.getByRole("button",{name:"5 stars",exact:true}).click();
 await expect(page.getByRole("status")).toHaveCount(0);
 await page.getByRole("button",{name:"Preview the thank-you"}).click();
 await expect(page.getByRole("status")).toContainText("5-star feedback");
 await page.getByRole("button",{name:"03 Entrance A-frame"}).click();
 await expect(page.locator(".display-image img")).toHaveAttribute("src","/images/entrance.webp");
 await page.getByRole("button",{name:/Yearly/}).click();
 await expect(page.locator(".plan-price").nth(1)).toHaveText("₹9,990/year");
 await page.getByRole("button",{name:"Monthly",exact:true}).click();
 await expect(page.locator(".plan-price").nth(1)).toHaveText("₹999/month");
 await page.locator("summary").filter({hasText:"Does this take orders or payments?"}).click();
 await expect(page.locator("details[open]")).toContainText("not included");
 await expect(page.getByRole("link",{name:"Let's talk Standard"})).toHaveAttribute("href",/Standard%20QR%20Menu%20plan/);
 expect(errors).toEqual([]);
});
for(const size of [{width:1440,height:1000},{width:390,height:844},{width:320,height:740}]){
 test("layout and images at "+size.width,async({page})=>{
 await page.setViewportSize(size);await page.goto("/");await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator(".hero-art img")).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator(".display-image").scrollIntoViewIfNeeded();await expect(page.locator(".display-image img")).toBeVisible();await page.locator(".display-image img").evaluate((img:HTMLImageElement)=>img.decode());await page.locator(".hero").scrollIntoViewIfNeeded();
 const missing=await page.locator("img").evaluateAll(imgs=>(imgs as HTMLImageElement[]).filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));
 expect(missing).toEqual([]);
 await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));await page.screenshot({path:"test-results/home-"+size.width+".png",fullPage:true});
 });
}
test("reduced motion keeps complete content and usable controls",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/");
 await page.getByRole("button",{name:"02 Listen"}).click();
 await expect(page.locator(".story-stage img")).toHaveAttribute("src","/images/review-screen.webp");
 await expect(page.getByRole("link",{name:"Book your free demo"})).toHaveAttribute("href",/^https:\/\/wa.me\/916380111799/);
});

test("scrolling advances the story in a short desktop window",async({page})=>{
 await page.setViewportSize({width:1280,height:400});await page.emulateMedia({reducedMotion:"reduce"});
 const errors:string[]=[];page.on("console",msg=>{if(msg.type()==="error")errors.push(msg.text())});
 await page.goto("/");
 for(const [index,asset] of ["menu-screen","review-screen","thankyou-screen"].entries()){
 await page.locator(".story-chapter").nth(index).evaluate(el=>el.scrollIntoView({block:"center",behavior:"instant"}));
 await expect(page.locator(".story-stage img")).toHaveAttribute("src","/images/"+asset+".webp");
 }
 expect(errors).toEqual([]);
});
test("keyboard access reaches the main content",async({page})=>{
 await page.goto("/");await page.keyboard.press("Tab");
 await expect(page.getByRole("link",{name:"Skip to content"})).toBeFocused();
 await page.keyboard.press("Enter");await expect(page).toHaveURL(/#main$/);
 await expect(page.getByRole("heading",{level:1})).toBeVisible();
});
