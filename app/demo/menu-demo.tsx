"use client";
import { useState } from "react";
import { assetPath } from "../../lib/assets";
import { specials, todayOffer, demoDishes } from "../../lib/demo-menu.mjs";
import DishIcon from "../../components/dish-icon";
import DishImage from "../../components/dish-image";

const categories=["All",...new Set(demoDishes.map(dish=>dish.category))];
const allDishes=demoDishes;
export default function MenuDemo(){
 const [category,setCategory]=useState("All");
 const [vegOnly,setVegOnly]=useState(false);
 const visible=allDishes.filter(dish=>(category==="All"||dish.category===category)&&(!vegOnly||dish.veg));
 return <div className="restaurant-demo">
 <a className="skip-link" href="#restaurant-menu">Skip to dishes</a>
 <div className="demo-notice">GRWSURE EXPERIENCE <span>Sample restaurant · menu demo</span></div>
 <header className="restaurant-header"><div className="restaurant-wrap"><a href={assetPath("/")} className="back-to-story">← Back to the idea</a><a href="#restaurant-menu" className="table-label">TABLE 05 <span>View menu ↓</span></a></div></header>
 <main className="restaurant-wrap">
 <section className="restaurant-welcome">
 <div className="restaurant-seal" aria-hidden="true"><DishIcon/></div>
 <p className="eyebrow">A warm welcome to your table</p>
 <h1>Kaveri<br/><em>Kitchen.</em></h1>
 <p className="restaurant-tagline">Good food. Familiar flavours.<br/>Something for everyone at the table.</p>
 <div className="restaurant-meta"><span>Indian favourites</span><span>Veg & non-veg</span><span>No app needed</span></div>
 <p className="sample-disclaimer">This is a sample menu, not a live restaurant. Dishes, prices, offers and ratings are illustrative.</p>
 </section>
 <section className="specials-section" aria-labelledby="specials-heading">
 <div className="menu-heading"><div><p className="eyebrow">Fresh in the spotlight</p><h2 id="specials-heading">Today's <em>specials.</em></h2></div><span className="chef-note">A little extra love from the kitchen.</span></div>
 <div className="special-dishes">{specials.map((dish,index)=><article className={"special-dish special-"+index} key={dish.id}><div className="special-visual"><span className="special-chip">{index===0?"CHEF'S PICK":dish.veg?"VEGETARIAN FAVOURITE":"TODAY'S FAVOURITE"}</span><DishImage image={dish.image} imageAlt={dish.imageAlt} name={dish.name}/><span className="special-number" aria-hidden="true">0{index+1}</span></div><div className="special-content"><div className="dish-labels"><span className={dish.veg?"veg-mark":"nonveg-mark"}>{dish.veg?"VEG":"NON-VEG"}</span><span className="menu-rating">★ {dish.rating} <small>sample</small></span></div><h3>{dish.name}</h3><p>{dish.detail}</p><strong className="special-price">₹{dish.price}</strong></div></article>)}</div>
 </section>
 <section className="today-offer" aria-labelledby="offer-heading"><div className="offer-decoration" aria-hidden="true">✦</div><div><p className="eyebrow">Today's offer · sample</p><h2 id="offer-heading">{todayOffer.title}</h2><p>{todayOffer.description}</p><small>{todayOffer.terms}</small></div><div className="offer-price"><span>COMBO PRICE</span><strong>₹{todayOffer.price}</strong><div><s>₹{todayOffer.regularPrice}</s> <b>Save ₹{todayOffer.regularPrice-todayOffer.price}</b></div></div></section>
 <section className="full-menu" id="restaurant-menu" aria-labelledby="menu-heading">
 <div className="menu-heading"><div><p className="eyebrow">Find your favourite</p><h2 id="menu-heading">A menu to <em>savour.</em></h2></div><span className="menu-count" aria-live="polite">{visible.length} {visible.length===1?"dish":"dishes"}</span></div>
 <div className="restaurant-filters"><label className="menu-veg-toggle"><input type="checkbox" checked={vegOnly} onChange={e=>setVegOnly(e.target.checked)}/> Vegetarian only</label></div>
 <div className="restaurant-categories" role="group" aria-label="Dish categories">{categories.map(item=><button type="button" key={item} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div>
 <div className="restaurant-dish-grid">{visible.map(dish=><article className="restaurant-dish" key={dish.id}><div className={"restaurant-dish-art "+(dish.veg?"vegetarian":"")}><DishImage image={dish.image} imageAlt={dish.imageAlt} name={dish.name}/></div><div className="restaurant-dish-copy"><div className="dish-labels"><span className={dish.veg?"veg-mark":"nonveg-mark"}>{dish.veg?"VEG":"NON-VEG"}</span>{specials.some(special=>special.id===dish.id)&&<span className="today-tag">TODAY'S SPECIAL</span>}</div><h3>{dish.name}</h3><p>{dish.detail}</p><div className="dish-bottom"><span className="menu-rating">★ {dish.rating} <small>sample rating</small></span><strong>₹{dish.price}</strong></div></div></article>)}</div>
 {visible.length===0&&<div className="menu-empty" role="status"><h3>No dishes found.</h3><p>Try another category or reset the filters.</p><button type="button" className="button" onClick={()=>{setCategory("All");setVegOnly(false)}}>Show all dishes</button></div>}
 <p className="menu-help">Food allergies or dietary needs? In a live restaurant, please check ingredients with the serving team.</p>
 </section>
 <section className="demo-closing"><span className="restaurant-monogram">G</span><h2>That's the power<br/>of <em>one little scan.</em></h2><p>Your guests see the menu instantly—specials, prices and offers included.</p><a className="button" href={assetPath("/")+"#contact"}>Bring this to your restaurant ↗</a><a className="back-to-story" href={assetPath("/")+"#scan-demo"}>Back to the QR presentation</a></section>
 </main>
 <footer className="restaurant-footer"><span>Powered by GRWSURE</span><span>Demo only · No ordering or review collection</span></footer>
 </div>
}
