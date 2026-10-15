"use client";
import {useState} from "react";
import {assetPath} from "../lib/assets";
import DishIcon from "./dish-icon";

export default function DishImage({image,imageAlt,name}:{image?:string;imageAlt?:string;name:string}){
 const [failedImage,setFailedImage]=useState<string>();
 const source=image?.trim();
 const showImage=!!source&&failedImage!==source;
 return <div className="dish-image" data-placeholder={!showImage}>
 {showImage?<img src={assetPath(source)} alt={imageAlt?.trim()||name} loading="lazy" onError={()=>setFailedImage(source)}/>:<div className="dish-image-placeholder" role="img" aria-label={name+" — photo coming soon"}><DishIcon/><span>Photo coming soon</span></div>}
 </div>;
}