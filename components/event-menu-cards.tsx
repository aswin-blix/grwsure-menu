import {eventMenus} from "../lib/event-menus.mjs";
import {assetPath} from "../lib/assets";
import EventMotif from "./event-motif";
export default function EventMenuCards(){return <section className="event-showcase container" id="event-menus" aria-labelledby="event-heading">
 <div className="section-heading"><p className="eyebrow">A different occasion. A different experience.</p><h2 id="event-heading">A menu for<br/><em>every celebration.</em></h2><p>Scan a dedicated QR to step into each theme. Christmas, Indian favourites and Diwali—each with its own menu and personality.</p></div>
 <div className="event-card-grid">{eventMenus.map(menu=><article className={`event-qr-card event-card-${menu.theme}`} key={menu.slug}>
 <div className="event-card-cover"><EventMotif theme={menu.theme}/><span>THE SAMPLE COLLECTION</span><h3>{menu.title}</h3><p>{menu.subtitle}</p></div>
 <div className="event-card-body"><a href={assetPath(`/menus/${menu.slug}/`)} aria-label={`Open ${menu.title} menu`}><img src={assetPath(`/images/${menu.slug}-qr.svg`)} alt={`Scan to open the ${menu.title} demo menu`} width="220" height="220"/></a><p>SCAN FOR {menu.title.toUpperCase()}</p><a className="button" href={assetPath(`/menus/${menu.slug}/`)}>Explore {menu.title} ↗</a><a className="text-link" href={assetPath(`/images/${menu.slug}-qr.png`)} download={`${menu.slug}-qr.png`}>Download QR ↓</a></div>
 </article>)}</div><p className="event-showcase-note">Each QR has its own permanent menu link. Future occasions can be added to the collection with a matching theme.</p>
 </section>}
