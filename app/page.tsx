"use client";
import { useRef, useState } from "react";
import { assetPath } from "../lib/assets";
import DishIcon from "../components/dish-icon";
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll, useSpring } from "motion/react";
import { plans, planFee, filterMenu, thankYou, demoLink } from "../lib/content.mjs";

const chapters = [
 {label:"Discover",title:"The menu arrives before the waiter.",body:"One scan opens your restaurant's menu. Guests explore dishes, prices and today's special on their own phone. No app. No waiting for a menu card.",image:"menu-screen",caption:"Your restaurant. Beautifully on every phone.",tags:["Photos & prices","Today's Special","Dish ratings"]},
 {label:"Listen",title:"Every dish has a story. Let guests add theirs.",body:"After the meal, guests can rate dishes and share what they loved—or what could be better. A simple feedback journey gives you something useful to act on.",image:"review-screen",caption:"A few moments of feedback. A better next visit.",tags:["Dish-level feedback","Simple star ratings","Google review link"]},
 {label:"Reconnect",title:"The meal ends. The connection doesn't.",body:"A personal WhatsApp thank-you keeps the experience warm. Guests who opt in can stay connected with your restaurant beyond their visit.",image:"thankyou-screen",caption:"A small thank-you that feels personal.",tags:["WhatsApp thank-you","Opted-in guest list","A reason to return"]}
];
const displays = [
 {id:"easel",name:"The table companion",type:"QR card on mini easel",description:"A small wooden easel with a branded QR card. A natural fit for café tables and family restaurants."},
 {id:"tent",name:"Simple. Seen from both sides.",type:"Table tent card",description:"A freestanding folded card. Easy to place, easy to spot, easy to replace."},
 {id:"entrance",name:"Start the story at the door.",type:"Entrance A-frame",description:"Introduce your digital menu before guests even take their seats."},
 {id:"counter",name:"Make waiting worth a look.",type:"Counter display frame",description:"Highlight specials and your menu at the billing counter or waiting area."}
];
function Arrow(){return <span aria-hidden="true">↗</span>}
function Reveal({children,className=""}:{children:React.ReactNode;className?:string}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={{opacity:1,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduce?0:.6}}>{children}</motion.div>
}

export default function Home(){
 const reduce=useReducedMotion();
 const {scrollYProgress}=useScroll();
 const progress=useSpring(scrollYProgress,{stiffness:110,damping:28});
 const [active,setActive]=useState(0);
 const [category,setCategory]=useState("Biryani");
 const [vegOnly,setVegOnly]=useState(false);
 const [rating,setRating]=useState(0);
 const [preview,setPreview]=useState(false);
 const [annual,setAnnual]=useState(false);
 const [display,setDisplay]=useState(0);
 const chapterRefs=useRef<(HTMLElement|null)[]>([]);
 const dishes=filterMenu(category,vegOnly);
 const message=thankYou(rating);
 return <MotionConfig reducedMotion="user">
 <a className="skip-link" href="#main">Skip to content</a>
 <motion.div className="reading-progress" style={{scaleX:reduce?scrollYProgress:progress}}/>
 <header className="site-header"><nav className="container" aria-label="Main navigation">
 <a href="#" className="brand" aria-label="GRWSURE home"><img src={assetPath("/images/logo.webp")} alt="GRWSURE Education & Consulting" width="215" height="65"/></a>
 <div className="nav-links"><a href="#story">The experience</a><a href="#displays">QR displays</a><a href="#pricing">Pricing</a></div>
 <a className="button small-button" href="#contact">Let's talk <Arrow/></a>
 </nav></header>
 <main id="main">
 <section className="hero container">
 <div className="hero-copy">
 <p className="eyebrow"><span/> A smarter welcome for your guests</p>
 <h1>One little scan.<br/>A whole new<br/><em>experience.</em></h1>
 <p className="hero-description">Your menu on their phone. Their favourite dishes, their honest feedback, and a thank-you that brings the experience full circle.</p>
 <div className="hero-actions"><a className="button" href="#story">Follow the guest journey <span aria-hidden="true">↓</span></a><a className="text-link" href="#scan-demo">Try the demo <Arrow/></a></div>
 <p className="tamil" lang="ta">மெனு கார்டு வேண்டாம், போனிலேயே பாருங்க!</p>
 <div className="hero-meta"><span>For restaurants & hotels</span><i/>No app download</div>
 </div>
 <motion.div className="hero-art" initial={false} animate={{rotate:reduce?0:[0,-1.2,0],y:reduce?0:[0,-8,0]}} transition={{duration:7,repeat:reduce?0:Infinity,ease:"easeInOut"}}>
 <div className="hero-orbit"/><span className="hero-note">A better meal starts<br/>with a simple scan.</span>
 <img src={assetPath("/images/hero.webp")} alt="Original catalog preview: a table QR card beside the Kaveri Kitchen mobile menu" width="1200" height="1312" fetchPriority="high"/>
 <div className="floating-label"><span className="status-dot"/> Smart menus. Happy guests.</div>
 <span className="sample-note">Illustrative restaurant & menu</span>
 </motion.div>
 <a className="scroll-note" href="#story"><span>SCROLL TO DISCOVER</span><span aria-hidden="true">↓</span></a>
 </section>
 <div className="chapter-strip"><div className="container"><span>01 <b>Scan & discover</b></span><span>02 <b>Enjoy & review</b></span><span>03 <b>Thank & reconnect</b></span></div></div>

 <section className="qr-experience container" id="scan-demo" aria-labelledby="scan-heading">
 <div className="qr-copy"><p className="eyebrow">From your screen to their table</p><h2 id="scan-heading">Scan it.<br/><em>Experience it.</em></h2><p>Point your phone camera at this QR code. You'll open a restaurant menu with special dishes, prices, sample ratings and today's offer.</p><ol className="scan-steps"><li>Open your phone camera</li><li>Scan the QR and tap the link</li><li>Explore the menu on your phone</li></ol><a className="button" href={assetPath("/demo/")}>Open the demo menu <Arrow/></a><p className="fine-print">Already on your phone? Use the button. This is an illustrative menu demo; no orders or reviews are collected.</p></div>
 <div className="live-qr-card"><span className="eyebrow">Kaveri Kitchen · Demo</span><h3>Your table.<br/>Your menu.</h3><a href={assetPath("/demo/")} aria-label="Open Kaveri Kitchen demo menu"><img src={assetPath("/images/demo-qr.svg")} alt="Scan this QR code to open the live Kaveri Kitchen demo menu" width="250" height="250"/></a><strong>SCAN FOR THE MENU</strong><p>Specials · Prices · Ratings · Offers</p><a className="text-link" href={assetPath("/images/demo-qr.png")} download="grwsure-demo-qr.png">Download this QR ↓</a></div>
 </section>

 <section className="story-section container" id="story">
 <div className="section-heading"><p className="eyebrow">A visit, reimagined</p><h2>Good hospitality.<br/><em>Now on their phone.</em></h2><p>Follow one guest from the first scan to the next hello.</p></div>
 <div className="story-grid">
 <div className="story-visual">
 <div className="story-stage">
 <span className="stage-number" aria-hidden="true">0{active+1}</span>
 <AnimatePresence mode="wait" initial={false}><motion.img key={active} src={assetPath(`/images/${chapters[active].image}.webp`)} alt={`Catalog example: ${chapters[active].label} screen`} width="660" height="1358" initial={{opacity:0,y:reduce?0:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduce?0:-12}} transition={{duration:reduce?0:.3}}/></AnimatePresence>
 <span className="stage-badge">KAVERI KITCHEN · SAMPLE</span>
 </div>
 <div className="chapter-controls" aria-label="Guest journey stages">{chapters.map((chapter,i)=><button key={chapter.label} type="button" aria-label={`0${i+1} ${chapter.label}`} aria-pressed={active===i} onClick={()=>{setActive(i);if(window.innerWidth>800)chapterRefs.current[i]?.scrollIntoView({behavior:reduce?"instant":"smooth",block:"center"});}}><span>0{i+1}</span>{chapter.label}</button>)}</div>
 <p className="stage-caption">{chapters[active].caption}</p>
 </div>
 <div className="story-chapters">{chapters.map((chapter,i)=><motion.article key={chapter.label} ref={el=>{chapterRefs.current[i]=el}} className={`story-chapter ${active===i?"is-active":""}`} onViewportEnter={()=>setActive(i)} viewport={{amount:.25}}>
 <p className="eyebrow">Chapter 0{i+1} / {chapter.label}</p><h3>{chapter.title}</h3><p>{chapter.body}</p><div className="tags">{chapter.tags.map(tag=><span key={tag}>{tag}</span>)}</div>{i===1&&<small>Reviews and guest follow-up are included in Standard and Premium.</small>}
 </motion.article>)}</div>
 </div>
 </section>

 <section className="owner-section"><div className="container">
 <div className="owner-heading"><div><p className="eyebrow">Meanwhile, behind the counter</p><h2>More time for guests.<br/><em>Less time on menus.</em></h2></div><p>Your team keeps serving. Our team keeps the menu up to date.</p></div>
 <div className="owner-grid">
 <Reveal><span className="feature-number">01</span><h3>New price? Just message.</h3><p>Send changes to our team on WhatsApp. All plans include 10 menu changes per month, without reprinting the menu.</p></Reveal>
 <Reveal><span className="feature-number">02</span><h3>Give your special a spotlight.</h3><p>Feature today's dish at the top of the menu, right where your guests are deciding what to eat.</p></Reveal>
 <Reveal><span className="feature-number">03</span><h3>Know what guests love.</h3><p>Dish feedback helps you spot favourites and improve the experience. Premium adds a monthly report on top dishes and ratings.</p></Reveal>
 </div></div></section>

 <section className="demo-section container" id="demo">
 <div className="demo-intro"><p className="eyebrow">A little taste of the experience</p><h2>Don't just picture it.<br/><em>Give it a try.</em></h2><p>Explore a category, choose a rating, and preview the thank-you. That's the idea—made tangible.</p><div className="demo-instructions"><span>01 / Browse</span><span>02 / Rate</span><span>03 / Preview</span></div><p className="fine-print">Illustrative demo. Dishes, prices and ratings are examples. No orders, reviews or personal details are collected. No message is sent.</p></div>
 <div className="demo-window">
 <div className="demo-top"><span className="restaurant-monogram">K</span><div><strong>Kaveri Kitchen</strong><small>Table 5 · Interactive sample</small></div><span className="live-pill">DEMO</span></div>
 <div className="special-banner"><div><span>TODAY'S SPECIAL</span><strong>Mutton Chukka Biryani</strong><small>Only today · ₹280 · Sample</small></div><DishIcon/></div>
 <div className="menu-controls"><div className="category-tabs" aria-label="Menu categories">{["Biryani","Meals","Starters"].map(value=><button type="button" key={value} aria-pressed={category===value} onClick={()=>setCategory(value)}>{value}</button>)}</div><label className="veg-toggle"><input type="checkbox" checked={vegOnly} onChange={e=>setVegOnly(e.target.checked)}/> Veg only</label></div>
 <div className="dish-list" aria-live="polite"><AnimatePresence mode="wait" initial={false}><motion.div key={category+vegOnly} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.12}}>{dishes.map(dish=><div className="dish" key={dish.id}><div className={`dish-art ${dish.veg?"veg":""}`}><DishIcon/></div><div className="dish-content"><h4><span className={`diet-dot ${dish.veg?"veg":""}`} aria-label={dish.veg?"Vegetarian":"Non-vegetarian"}/>{dish.name}</h4><p>{dish.detail}</p><small>★ {dish.rating} <span>sample rating</span></small></div><strong className="dish-price">₹{dish.price}</strong></div>)}{dishes.length===0&&<p>No vegetarian dishes in this sample category.</p>}</motion.div></AnimatePresence></div>
 <div className="demo-review"><div><strong>How was your meal?</strong><small>Choose a sample rating.</small></div><div className="rating-stars" aria-label="Rate the sample meal">{[1,2,3,4,5].map(value=><button type="button" key={value} className={value<=rating?"selected":""} aria-pressed={value===rating} aria-label={`${value} ${value===1?"star":"stars"}`} onClick={()=>{setRating(value);setPreview(false)}}>★</button>)}</div></div>
 <button className="button full" type="button" onClick={()=>setPreview(true)}>Preview the thank-you <Arrow/></button>
 <AnimatePresence>{preview&&<motion.div className="thankyou-preview" role="status" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}><span>{message?"WHATSAPP MESSAGE PREVIEW":"ONE SMALL STEP FIRST"}</span><p>{message??"Choose a star rating above to preview the thank-you message."}</p>{message&&<small>Preview only. No message was sent.</small>}</motion.div>}</AnimatePresence>
 </div></section>

 <section className="displays-section" id="displays"><div className="container">
 <div className="display-heading"><div><p className="eyebrow">A place in your space</p><h2>Small displays.<br/><em>A clear invitation.</em></h2></div><p>From the entrance to the table, make your menu easy to discover. The display concepts below come directly from our catalog.</p></div>
 <div className="display-showcase">
 <div className="display-image"><AnimatePresence mode="wait" initial={false}><motion.img key={display} src={assetPath(`/images/${displays[display].id}.webp`)} alt={displays[display].type+" design from the catalog"} width="925" height="845" loading="lazy" initial={{opacity:0,scale:reduce?1:.98}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.2}}/></AnimatePresence><span>CATALOG DESIGN / 0{display+1}</span></div>
 <div className="display-copy"><div className="display-tabs" aria-label="Display options">{displays.map((item,i)=><button key={item.id} type="button" aria-pressed={display===i} onClick={()=>setDisplay(i)}>0{i+1} <span>{item.type}</span><Arrow/></button>)}</div><h3>{displays[display].name}</h3><p>{displays[display].description}</p><p className="fine-print">Classic green, colourful, dark bold or vintage. Final materials and display style are agreed during setup. Additional formats are available on request.</p></div>
 </div></div></section>

 <section className="pricing-section container" id="pricing">
 <div className="pricing-heading"><p className="eyebrow">An easy place to begin</p><h2>One setup.<br/><em>Your choice of plan.</em></h2><p>Start with a digital menu. Add feedback and guest follow-up when you're ready.</p>
 <div className="billing-switch" aria-label="Billing period"><button type="button" aria-pressed={!annual} onClick={()=>setAnnual(false)}>Monthly</button><button type="button" aria-pressed={annual} onClick={()=>setAnnual(true)}>Yearly <span>2 months free</span></button></div></div>
 <div className="setup-bar"><div><span className="eyebrow">One-time setup</span><p>Menu design & entry, your QR link, and table QR stickers or stands for up to 10 tables.</p></div><strong>₹4,999</strong></div>
 <div className="plans">{plans.map(plan=><article className={`plan ${plan.name==="Standard"?"featured":""}`} key={plan.name}>{plan.name==="Standard"&&<span className="popular">MOST POPULAR</span>}<h3>{plan.name}</h3><p>{plan.description}</p><div className="plan-price" aria-live="polite">₹{planFee(plan.monthly,annual).toLocaleString("en-IN")}<span>/{annual?"year":"month"}</span></div><small>{annual?"Annual plan fee · pay for 10, get 12 months":"Monthly plan fee"}</small><ul>{plan.features.map(feature=><li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}{plan.excluded.map(feature=><li className="excluded" key={feature}><span aria-hidden="true">—</span>{feature} <span className="sr-only">(not included)</span></li>)}</ul><a className={`button ${plan.name==="Standard"?"":"outline"}`} href={demoLink(plan.name+" QR Menu plan")}>Let's talk {plan.name} <Arrow/></a></article>)}</div>
 <div className="pricing-notes"><div><strong>First month free</strong><p>Try with real guests before paying monthly. Setup is charged separately.</p></div><div><strong>Extra tables?</strong><p>More than 10 tables: additional QR stands are quoted separately.</p></div><div><strong>Clear allowances</strong><p>WhatsApp limits are monthly totals. All prices exclude GST.</p></div></div><p className="fine-print">Annual pricing reflects the “pay 10, get 12” offer. Combining offers and any additional usage are confirmed before signup.</p>
 </section>

 <section className="faq-section container"><div><p className="eyebrow">Before we begin</p><h2>A few good<br/><em>questions.</em></h2></div><div className="faq-list">
 {[
 ["Do guests need an app?","No. A phone camera and browser are enough to open the QR menu."],
 ["Who changes our menu?","Send changes to the GRWSURE team on WhatsApp. Every plan includes 10 menu changes per month."],
 ["Does this take orders or payments?","This proposal covers digital menu browsing, dish feedback and guest follow-up. Online ordering, payments and billing integrations are not included in the listed scope. Your team continues its existing service process."],
 ["How do reviews and WhatsApp work?","Standard and Premium include dish reviews, a Google review link and WhatsApp thank-you messages. Guests choose whether to provide their details and consent to messages. Marketing messages are for opted-in guests."],
 ["Are the QR codes in these pictures live?","The QR in the Scan it. Experience it. section opens our working demo menu. QR codes within the original catalog pictures are illustrative. Your restaurant gets its own QR during setup."],
 ["What should we send you?","A photo of your menu, table count, WhatsApp number and Google review link. Your logo and dish photos are helpful if you have them."]
 ].map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}
 </div></section>

 <section className="contact-section" id="contact"><div className="container">
 <div className="contact-heading"><p className="eyebrow">The next chapter is yours</p><h2>Let's bring your<br/>menu <em>to life.</em></h2><p>Book a free demo at your restaurant.<br/>We'll show your own menu on a phone.</p><a className="button saffron" href={demoLink()}>Book your free demo <Arrow/></a></div>
 <div className="onboarding">{[["Share your menu","A photo of your current menu is enough to begin."],["Tell us your details","Table count, WhatsApp number and Google review link."],["We'll take it from here","Menu design, QR displays and staff training before you go live."]].map(([title,body],i)=><div key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
 <div className="contact-links"><a href="tel:+916380111799">+91 6380 111799 <Arrow/></a><a href="mailto:ho@grwsureinfotech.in">ho@grwsureinfotech.in <Arrow/></a><a href="https://www.grwsureinfotech.in">grwsureinfotech.in <Arrow/></a></div>
 </div></section>
 </main><footer className="container"><span>Grwsure Education and Consulting Private Limited</span><span>Smart menus. Happy guests.</span><a href="#">Back to top ↑</a></footer>
 </MotionConfig>;
}
