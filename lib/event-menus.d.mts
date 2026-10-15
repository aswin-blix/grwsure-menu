export type EventDish = {name:string;detail?:string;price?:number;veg?:boolean};
export type EventMenu = {slug:string;theme:string;title:string;subtitle:string;eyebrow:string;intro:string;occasion:string;currency:string;pricing:{label:string;value:string}[];note:string;highlight:{title:string;description:string;label:string};sections:{title:string;items:EventDish[]}[]};
export const eventMenus: EventMenu[];
export function eventMenuUrl(slug:string):string;
