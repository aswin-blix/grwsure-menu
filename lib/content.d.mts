export type Plan = {name:string;monthly:number;description:string;features:string[];excluded:string[]};
export type Dish = {image?:string;imageAlt?:string;id:string;category:string;name:string;price:number;veg:boolean;rating:string;detail:string};
export const plans: Plan[];
export const menu: Dish[];
export function planFee(monthly:number,annual:boolean):number;
export function filterMenu(category:string,vegOnly:boolean):Dish[];
export function thankYou(rating:number):string|null;
export function demoLink(plan?:string):string;
