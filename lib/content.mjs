export const plans = [
 {name:"Basic", monthly:499, description:"A beautiful menu on every phone.", features:["QR menu with photos and prices","10 menu changes per month","Today's Special banner"], excluded:["Dish reviews & Google review button","WhatsApp thank-you & customer list","Festival broadcast & monthly report"]},
 {name:"Standard", monthly:999, description:"Turn a good meal into a connection.", features:["Everything in Basic","Dish ratings and reviews","Share on Google button","500 WhatsApp thank-you messages / month","Customer phone list"], excluded:["Festival broadcast & monthly report"]},
 {name:"Premium", monthly:1499, description:"Keep the conversation going.", features:["Everything in Basic","Dish ratings & Google review button","1,500 WhatsApp thank-you messages / month","Customer phone list","1 festival offer broadcast / month","Monthly top-dishes & ratings report"], excluded:[]}
];
export const menu = [
 {id:"chicken",category:"Biryani",name:"Chicken Biryani",price:220,veg:false,rating:"4.7",detail:"Seeraga samba rice, slow-cooked chicken and house masala."},
 {id:"veg",category:"Biryani",name:"Veg Biryani",price:160,veg:true,rating:"4.4",detail:"Fragrant rice, seasonal vegetables and warming spices."},
 {id:"egg",category:"Biryani",name:"Egg Biryani",price:180,veg:false,rating:"4.5",detail:"A comforting biryani with eggs and aromatic rice."},
 {id:"meal",category:"Meals",name:"South Indian Meals",price:140,veg:true,rating:"4.6",detail:"Rice, sambar, rasam and a selection of sides."},
 {id:"chicken-meal",category:"Meals",name:"Chicken Meals",price:200,veg:false,rating:"4.5",detail:"A hearty meal with chicken curry and accompaniments."},
 {id:"paneer",category:"Starters",name:"Paneer Pepper Fry",price:180,veg:true,rating:"4.6",detail:"Paneer tossed with pepper, onions and curry leaves."},
 {id:"chicken65",category:"Starters",name:"Chicken 65",price:190,veg:false,rating:"4.7",detail:"Crisp, spiced chicken bites to start your meal."}
];
export function planFee(monthly, annual) {return annual ? monthly * 10 : monthly;}
export function filterMenu(category, vegOnly) {return menu.filter(item => item.category === category && (!vegOnly || item.veg));}
export function thankYou(rating) {
 if (!Number.isInteger(rating) || rating < 1 || rating > 5) return null;
 return "Thank you for visiting Kaveri Kitchen! We appreciate your " + rating + "-star feedback. Your experience matters to us. We hope to welcome you again soon.";
}
export function demoLink(plan="Smart QR Menu") {return "https://wa.me/916380111799?text=" + encodeURIComponent("Hello GRWSURE, I would like a free demo of the " + plan + " for my restaurant.");}
