import { menu } from "./content.mjs";
export const DEMO_MENU_URL = "https://aswin-blix.github.io/grwsure-menu/demo/";
export const specials = [
 {id:"mutton-special",category:"Biryani",name:"Mutton Chukka Biryani",price:280,veg:false,rating:"4.8",detail:"Seeraga samba rice with slow-cooked mutton chukka and house spices."},
 {...menu.find(dish=>dish.id==="paneer"),id:"paneer-special",category:"Specials"}
];
export const demoDishes = [...specials,...menu];
export const todayOffer = {
 title:"A little more to savour.",
 description:"Veg Biryani + Paneer Pepper Fry",
 price:299,
 regularPrice:menu.find(dish=>dish.id==="veg").price + menu.find(dish=>dish.id==="paneer").price,
 terms:"Illustrative dine-in combo for this demo. One of each dish; no delivery or ordering is provided."
};
