import test from "node:test";
import assert from "node:assert/strict";
import {plans,planFee,filterMenu,thankYou,demoLink} from "../lib/content.mjs";
test("catalog pricing and annual offer stay accurate",()=>{assert.deepEqual(plans.map(p=>p.monthly),[499,999,1499]);assert.deepEqual(plans.map(p=>planFee(p.monthly,true)),[4990,9990,14990]);assert.equal(planFee(999,false),999)});
test("vegetarian filtering excludes egg and chicken",()=>{assert.deepEqual(filterMenu("Biryani",true).map(d=>d.id),["veg"]);assert.equal(filterMenu("Biryani",false).length,3);assert.deepEqual(filterMenu("Unknown",true),[])});
test("all valid ratings receive a thank-you, invalid ratings cannot submit",()=>{for(let i=1;i<=5;i++)assert.match(thankYou(i),new RegExp(i+"-star"));for(const v of [0,6,-1,1.5,NaN])assert.equal(thankYou(v),null)});
test("plan enquiry preserves chosen plan and fixed recipient",()=>{const u=new URL(demoLink("Standard QR Menu plan"));assert.equal(u.hostname,"wa.me");assert.equal(u.pathname,"/916380111799");assert.match(u.searchParams.get("text"),/Standard QR Menu plan/)});
