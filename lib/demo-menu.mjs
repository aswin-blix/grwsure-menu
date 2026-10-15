import standard from "../content/menus/standard.json" with {type:"json"};
export const DEMO_MENU_URL = "https://aswin-blix.github.io/grwsure-menu/demo/";
export const demoDishes = standard.dishes;
export const specials = standard.specialIds.map(id=>standard.dishes.find(dish=>dish.id===id));
export const todayOffer = {...standard.offer, regularPrice:standard.offer.itemIds.reduce((total,id)=>total+standard.dishes.find(dish=>dish.id===id).price,0)};
