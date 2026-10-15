// Demo content: Christmas dishes/prices adapted from the supplied poster.
// Indian and Diwali prices are illustrative, not live restaurant offers.
export const eventMenus = [
 {
  slug:"christmas", theme:"christmas", title:"Christmas", subtitle:"Eve dinner buffet",
  eyebrow:"A table full of Christmas joy", intro:"Gather your favourite people. Share a generous festive feast, from warming soups to a sweet final bite.",
  occasion:"Christmas Eve · Sample celebration", currency:"BD",
  pricing:[{label:"Adult buffet",value:"BD 6"},{label:"Kids buffet",value:"BD 3"}],
  note:"Buffet prices and dishes follow your reference poster. This is a demo, not a current event or booking offer. Please confirm children's age limits and dietary details with the restaurant.",
  highlight:{title:"The festive centrepiece",description:"Roasted turkey with sautéed potatoes, vegetables and cranberry sauce.",label:"Live carving display"},
  sections:[
   {title:"Soup",items:[{name:"Thai Pumpkin Soup",detail:"With coconut milk",veg:true},{name:"Murgh Dhaniya Shorba",veg:false}]},
   {title:"Salad",items:[{name:"Garden Salad",detail:"Cucumber, cherry tomato, corn and bell pepper; olives and lemon-mustard dressing",veg:true},{name:"Roasted Beetroot & Orange",detail:"Walnut, feta and pomegranate dressing",veg:true},{name:"French Bean Salad",detail:"Caramelised onion and balsamic dressing",veg:true},{name:"Greek Grilled Chicken Salad",veg:false},{name:"Potato & Egg Salad",veg:false},{name:"Poached Prawn & Tomato Basil Salad",veg:false}]},
   {title:"Starter",items:[{name:"Hariyali Paneer Tikka",veg:true},{name:"Veg Spring Rolls",veg:true},{name:"Sesame Prawn Toast",veg:false},{name:"Chicken Shish Tawook",veg:false}]},
   {title:"Main course",items:[{name:"Veg Hakka Noodles",veg:true},{name:"Veg Malai Kofta",veg:true},{name:"Dal Makhani",veg:true},{name:"Veg Pulao",veg:true},{name:"Roasted Chicken",detail:"Garlic potato wedges, sautéed vegetables and creamy mushroom jus",veg:false},{name:"Potato Lyonnaise",veg:true},{name:"Fish Manchurian Gravy",veg:false},{name:"Chicken Tikka Masala",veg:false},{name:"Rara Mutton",veg:false},{name:"Mughlai Chicken Biryani",veg:false}]},
   {title:"Live display & breads",items:[{name:"Roasted Turkey",detail:"Sautéed potatoes, vegetables and cranberry sauce",veg:false},{name:"Indian Breads",detail:"Roti / naan",veg:true}]},
   {title:"Desserts",items:[{name:"Black Forest Cake",detail:"Please check egg content with the serving team"},{name:"Gulab Jamun",veg:true},{name:"Basbousa",veg:true},{name:"Rasmalai",veg:true}]}
  ]
 },
 {
  slug:"indian-special",theme:"indian",title:"Indian Special",subtitle:"A celebration of familiar flavours",
  eyebrow:"From our kitchen, with warmth",intro:"Crisp starters. Slow-simmered curries. Something sweet to finish. Settle in for the flavours that bring us together.",
  occasion:"The Indian collection · Sample à la carte",currency:"₹",pricing:[{label:"Menu style",value:"À la carte"},{label:"Prices in",value:"INR · ₹"}],
  note:"Inspired by your Indian menu reference. All prices below are illustrative INR prices, not conversions of the reference's dollar prices.",
  highlight:{title:"Biryani, the house favourite",description:"Fragrant basmati rice layered with chicken, warming spices and fresh herbs.",label:"Chef's special · ₹260"},
  sections:[
   {title:"Appetizers",items:[{name:"Samosa",detail:"Crisp pastry with spiced potatoes and peas",price:80,veg:true},{name:"Pakora",detail:"Seasonal vegetables in a crisp gram-flour batter",price:100,veg:true}]},
   {title:"Main courses",items:[{name:"Chicken Curry",detail:"Tender chicken in a slow-simmered onion and tomato gravy",price:240,veg:false},{name:"Aloo Gobi",detail:"Potatoes and cauliflower with toasted spices",price:160,veg:true},{name:"Dal Tadka",detail:"Yellow lentils finished with an aromatic tempering",price:140,veg:true},{name:"Chicken Biryani",detail:"Spiced basmati rice with chicken and fresh herbs",price:260,veg:false}]},
   {title:"Dessert",items:[{name:"Gulab Jamun",detail:"Soft milk dumplings in fragrant sugar syrup",price:90,veg:true},{name:"Kheer",detail:"Creamy rice pudding with cardamom and nuts",price:100,veg:true}]},
   {title:"Drinks",items:[{name:"Masala Chai",detail:"Tea brewed with milk and warming spices",price:50,veg:true},{name:"Lassi",detail:"Chilled yogurt drink, sweet or salted",price:80,veg:true}]}
  ]
 },
 {
  slug:"diwali",theme:"diwali",title:"Diwali",subtitle:"A feast of light & togetherness",
  eyebrow:"Light the lamps. Share the joy.",intro:"Golden bites, festive favourites and a little extra sweetness. A vegetarian celebration made for sharing with the people you love.",
  occasion:"Festival of lights · Sample festive menu",currency:"₹",pricing:[{label:"Festive thali",value:"₹499"},{label:"Menu",value:"Vegetarian"}],
  note:"An illustrative Diwali menu, ready to customise with your restaurant's dishes, prices and event dates. No live offers, reservations or orders are collected.",
  highlight:{title:"The celebration thali",description:"Paneer makhani, dal tadka, jeera rice, two butter rotis, raita and gulab jamun.",label:"Festive special · ₹499"},
  sections:[
   {title:"Festive beginnings",items:[{name:"Dahi Puri",detail:"Crisp puris, chilled yogurt and sweet-tangy chutneys",price:120,veg:true},{name:"Hara Bhara Kebab",detail:"Golden spinach and green-pea patties",price:160,veg:true},{name:"Paneer Tikka",detail:"Charred paneer with peppers and mint chutney",price:220,veg:true}]},
   {title:"The celebration table",items:[{name:"Diwali Celebration Thali",detail:"Paneer makhani, dal tadka, jeera rice, two butter rotis, raita and gulab jamun",price:499,veg:true},{name:"Paneer Makhani",detail:"Paneer in a creamy tomato and butter gravy",price:240,veg:true},{name:"Vegetable Dum Biryani",detail:"Layered basmati rice, vegetables and fragrant spices",price:220,veg:true}]},
   {title:"Sweet traditions",items:[{name:"Kaju Katli",detail:"Four pieces of delicate cashew fudge",price:140,veg:true},{name:"Gulab Jamun",detail:"Two warm dumplings in cardamom syrup",price:90,veg:true},{name:"Rasmalai",detail:"Two soft chenna rounds in saffron milk",price:120,veg:true}]},
   {title:"Raise a glass",items:[{name:"Kesar Badam Milk",detail:"Saffron milk with almonds, served warm",price:110,veg:true},{name:"Rose Lassi",detail:"Chilled yogurt blended with rose",price:100,veg:true}]}
  ]
 }
];
export function eventMenuUrl(slug) {
 if (!eventMenus.some(menu=>menu.slug===slug)) throw new Error("Unknown event menu: "+slug);
 return "https://aswin-blix.github.io/grwsure-menu/menus/"+slug+"/";
}
