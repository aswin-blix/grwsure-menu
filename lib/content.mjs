import standard from "../content/menus/standard.json" with {type:"json"};
export const plans = [
 {name:"Basic", monthly:499, description:"A beautiful menu on every phone.", features:["QR menu with photos and prices","10 menu changes per month","Today's Special banner"], excluded:["Dish reviews & Google review button","WhatsApp thank-you & customer list","Festival broadcast & monthly report"]},
 {name:"Standard", monthly:999, description:"Turn a good meal into a connection.", features:["Everything in Basic","Dish ratings and reviews","Share on Google button","500 WhatsApp thank-you messages / month","Customer phone list"], excluded:["Festival broadcast & monthly report"]},
 {name:"Premium", monthly:1499, description:"Keep the conversation going.", features:["Everything in Basic","Dish ratings & Google review button","1,500 WhatsApp thank-you messages / month","Customer phone list","1 festival offer broadcast / month","Monthly top-dishes & ratings report"], excluded:[]}
];
export const menu = standard.dishes.filter(dish=>!dish.featuredOnly);
export function planFee(monthly, annual) {return annual ? monthly * 10 : monthly;}
export function filterMenu(category, vegOnly) {return menu.filter(item => item.category === category && (!vegOnly || item.veg));}
export function thankYou(rating) {
 if (!Number.isInteger(rating) || rating < 1 || rating > 5) return null;
 return "Thank you for visiting Kaveri Kitchen! We appreciate your " + rating + "-star feedback. Your experience matters to us. We hope to welcome you again soon.";
}
export function demoLink(plan="Smart QR Menu") {return "https://wa.me/916380111799?text=" + encodeURIComponent("Hello GRWSURE, I would like a free demo of the " + plan + " for my restaurant.");}
