import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {eventMenus} from "../../../lib/event-menus.mjs";
import EventMenuView from "../event-menu-view";
import "../events.css";
export const dynamicParams=false;
export function generateStaticParams(){return eventMenus.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params; const menu=eventMenus.find(menu=>menu.slug===slug);
 return {title:menu ? menu.title+" | GRWSURE themed menu demo":"Menu not found",description:menu?.intro};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const menu=eventMenus.find(menu=>menu.slug===slug);
 if(!menu)notFound();
 return <EventMenuView menu={menu}/>;
}
