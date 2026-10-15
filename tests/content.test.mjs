import test from "node:test";
import assert from "node:assert/strict";
import {plans,planFee,filterMenu,thankYou,demoLink,menu} from "../lib/content.mjs";
test("catalog pricing and annual offer stay accurate",()=>{assert.deepEqual(plans.map(p=>p.monthly),[499,999,1499]);assert.deepEqual(plans.map(p=>planFee(p.monthly,true)),[4990,9990,14990]);assert.equal(planFee(999,false),999)});
test("vegetarian filtering returns the configured category and excludes non-vegetarian dishes",()=>{for(const category of new Set(menu.map(dish=>dish.category))){const all=filterMenu(category,false);const veg=filterMenu(category,true);assert.equal(all.length,menu.filter(dish=>dish.category===category).length);assert.ok(veg.every(dish=>dish.veg&&dish.category===category));assert.equal(veg.length,all.filter(dish=>dish.veg).length)}assert.deepEqual(filterMenu("Unknown",true),[])});
test("all valid ratings receive a thank-you, invalid ratings cannot submit",()=>{for(let i=1;i<=5;i++)assert.match(thankYou(i),new RegExp(i+"-star"));for(const v of [0,6,-1,1.5,NaN])assert.equal(thankYou(v),null)});
test("plan enquiry preserves chosen plan and fixed recipient",()=>{const u=new URL(demoLink("Standard QR Menu plan"));assert.equal(u.hostname,"wa.me");assert.equal(u.pathname,"/916380111799");assert.match(u.searchParams.get("text"),/Standard QR Menu plan/)});
