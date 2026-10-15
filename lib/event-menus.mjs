import christmas from "../content/menus/christmas.json" with {type:"json"};
import indian from "../content/menus/indian-special.json" with {type:"json"};
import diwali from "../content/menus/diwali.json" with {type:"json"};
export const eventMenus = [christmas, indian, diwali];
export function eventMenuUrl(slug) {
 if (!eventMenus.some(menu=>menu.slug===slug)) throw new Error("Unknown event menu: "+slug);
 return "https://aswin-blix.github.io/grwsure-menu/menus/"+slug+"/";
}
