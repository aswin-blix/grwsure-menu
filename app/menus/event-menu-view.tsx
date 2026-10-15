"use client";
import {useState} from "react";
import {assetPath} from "../../lib/assets";
import type {EventMenu} from "../../lib/event-menus.mjs";
import DishImage from "../../components/dish-image";
import EventMotif from "../../components/event-motif";
export default function EventMenuView({menu}:{menu:EventMenu}){
 const [vegOnly,setVegOnly]=useState(false);
 const visible=menu.sections.map(section=>({...section,items:section.items.filter(dish=>!vegOnly||dish.veg===true)})).filter(section=>section.items.length);
 const count=visible.reduce((sum,section)=>sum+section.items.length,0);
 return <div className="event-menu" data-theme={menu.theme}>
 <a className="skip-link" href="#event-dishes">Skip to menu</a>
 <div className="event-demo-label">GRWSURE COLLECTION <span>Illustrative menu demo</span></div>
 <header className="event-topbar"><a href={assetPath("/")+"#event-menus"}>← All menu experiences</a><span>KAVERI KITCHEN · SAMPLE</span></header>
 <main>
 <section className="event-hero">
 <div className="event-corner left" aria-hidden="true"><EventMotif theme={menu.theme}/></div><div className="event-corner right" aria-hidden="true"><EventMotif theme={menu.theme}/></div>
 <div className="event-hero-inner"><div className="event-emblem"><EventMotif theme={menu.theme}/></div><p className="event-eyebrow">{menu.eyebrow}</p><h1>{menu.title}</h1><p className="event-subtitle">{menu.subtitle}</p><div className="event-divider" aria-hidden="true">✦</div><p className="event-intro">{menu.intro}</p><span className="event-occasion">{menu.occasion}</span><div className="event-pricing">{menu.pricing.map(price=><div key={price.label}><span>{price.label}</span><strong>{price.value}</strong></div>)}</div><a className="event-button" href="#event-dishes">Discover the menu ↓</a></div>
 </section>
 <div className="event-content">
 <aside className="event-highlight"><div className="highlight-motif"><EventMotif theme={menu.theme}/></div><div><p className="event-eyebrow">{menu.highlight.label}</p><h2>{menu.highlight.title}</h2><p>{menu.highlight.description}</p></div></aside>
 <section id="event-dishes" aria-labelledby="event-dishes-title"><div className="event-menu-heading"><p className="event-eyebrow">Made to be savoured</p><h2 id="event-dishes-title">{menu.theme==="christmas"?"Your festive feast":"At the table"}</h2><p>{menu.theme==="christmas"?"All dishes below are included in the sample buffet.":"Explore our sample selection. All prices are illustrative."}</p></div>
 <div className="event-controls"><label className="event-veg"><input type="checkbox" checked={vegOnly} onChange={e=>setVegOnly(e.target.checked)}/>Vegetarian only</label></div>
 <nav className="event-categories" aria-label="Menu sections">{visible.map(section=><a key={section.title} href={`#course-${menu.sections.findIndex(item=>item.title===section.title)}`}>{section.title}</a>)}</nav>
 <p className="event-results" aria-live="polite">{count} dishes · {menu.theme==="christmas"?"Buffet selection":"Prices in Indian rupees"}</p>
 <div className="event-course-grid">{visible.map(section=><section className="event-course" key={section.title} id={`course-${menu.sections.findIndex(item=>item.title===section.title)}`}><h3><span aria-hidden="true">✦</span>{section.title}</h3>{section.items.map(dish=><article className="event-dish" key={dish.name}><div className="event-dish-image"><DishImage image={dish.image} imageAlt={dish.imageAlt} name={dish.name}/></div><div className="event-dish-copy"><h4>{dish.name}</h4>{dish.detail&&<p>{dish.detail}</p>}<span className={dish.veg===true?"event-diet veg":"event-diet"}>{dish.veg===true?"● Vegetarian":dish.veg===false?"● Non-vegetarian":"Ask about ingredients"}</span></div>{dish.price!==undefined&&<strong className="event-dish-price">{menu.currency}{dish.price}</strong>}</article>)}</section>)}</div>
 {count===0&&<div className="event-empty" role="status"><h3>No dishes found</h3><p>Clear the vegetarian filter to see all dishes.</p><button className="event-button" onClick={()=>{setVegOnly(false)}}>Clear filters</button></div>}
 </section><div className="event-footnote"><EventMotif theme={menu.theme}/><h2>{menu.theme==="christmas"?"Season’s greetings":menu.theme==="diwali"?"A little light. A lot of joy.":"Come hungry. Leave happy."}</h2><p>{menu.note}</p><p>For allergies and dietary requirements, confirm ingredients with the serving team.</p><a href={assetPath("/")+"#event-menus"} className="event-button">Explore the other menus ↗</a></div>
 </div></main><footer className="event-footer"><span>Powered by GRWSURE</span><span>Demo only · No ordering or review collection</span></footer>
 </div>;
}
