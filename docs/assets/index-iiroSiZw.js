(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const C=document.createElement("div");C.id="main-filters";const b=(c,t,n,r,e="")=>{const o=document.createElement("div");o.className="filter";const a=document.createElement("label");a.htmlFor=t,a.textContent=n;const s=document.createElement("select");s.id=t,s.name=r;const i=document.createElement("option");i.value=e,i.textContent=e||"Any",i.selected="selected",s.append(i);for(const h of c){const m=document.createElement("option");m.value=h,m.textContent=h,s.append(m),o.append(a,s),C.append(o)}return s},A=c=>{const t=document.createElement("div");t.id="filters";const n=document.createElement("form");n.id="form";const r=document.createElement("h2");r.textContent="Search NASA Database:";const e=document.createElement("div");e.id="searchbar";const o=document.createElement("label");o.htmlFor="search",o.textContent="Custom Search: ";const a=document.createElement("input");a.type="text",a.id="search",a.name="q",a.placeholder="Search the cosmos...",e.append(o,a);const s=document.createElement("h3");s.textContent="Apply filters: ",t.append(s);const i=["MOON","STAR","JUPITER","PLANET","ASTRONAUT","ASTEROID","BLACK HOLE","HUBBLE","GALAXY","SATELLITE"].sort();b(i,"keyword-filter","Keyword: ","keywords"),b(["Bridget Caswell","Eric Bordelon","Bill Ingalls","Josh Varcarcel","Desiree Stover","Bill Stafford","Jordan Salkin","Jeff Janis","Jim Ross","Norah Moran"],"photographer-filter","Photographer: ","photographer"),b([10,30,50],"page-size-select","Image Count: ","page_size",20),t.append(C);const f=document.createElement("div");f.id="year-inputs";const p=new Date().getFullYear(),g=document.createElement("div");g.className="filter";const l=document.createElement("input");l.type="number",l.min=1920,l.max=p,l.id="year-start",l.value=1920,l.name="year_start",l.placeholder="Min: 1920";const E=document.createElement("label");E.htmlFor=l.id,E.textContent="Earliest Year: ",g.append(E,l);const y=document.createElement("div");y.className="filter";const d=document.createElement("input");d.type="number",d.min=1920,d.max=p,d.id="year-end",d.value=p,d.placeholder=`Max: ${p}`,d.name="year_end";const L=document.createElement("label");L.htmlFor=d.id,L.textContent="Latest Year: ",y.append(L,d),f.append(g,y),t.append(f);const u=document.createElement("div");u.id="buttons";const w=document.createElement("button");w.textContent="Search";const v=document.createElement("button");return v.type="reset",v.textContent="Reset Filters",u.append(w,v),n.append(r,e,t,u),c.append(n),{form:n,h2:r,searchDiv:e,filterDiv:t,buttons:u}},S=(c,t)=>{c.innerHTML="";for(const n of t){const r=document.createElement("li");r.classList.add("image");const e=document.createElement("img");e.src=n.imageUrl,e.alt=n.title,e.dataset.imageUrl=n.imageUrl,e.dataset.title=n.title,e.dataset.photographer=n.photographer??"Not Found",e.dataset.location=n.location??"Not Found",e.dataset.description=n.description??"Not Found",e.dataset.dateCreated=n.dateCreated??"Not Found",r.append(e),c.appendChild(r)}},F=(c,t)=>{c.innerHTML="";const n=document.createElement("h2");n.textContent=t.dataset.title;const r=document.createElement("h3");r.textContent=`Photographer: ${t.dataset.photographer}`;const e=document.createElement("img");e.src=t.dataset.imageUrl,e.alt=`A picture of ${t.dataset.title}`;const o=document.createElement("p");o.textContent=`Description: ${t.dataset.description}`;const a=document.createElement("p");a.textContent=`Location: ${t.dataset.location}`;const s=document.createElement("p");s.textContent=`Date: ${t.dataset.dateCreated}`,c.append(n,r,e,o,a,s)},I="https://images-api.nasa.gov/search",x=async(c="q=space",t=20)=>{try{const n=await fetch(`${I}?${c}&media_type=image`);if(!n.ok)throw new Error("Failed to get images");const{collection:r}=await n.json();console.log(r);const e=[];for(let o=0;o<t;o++){const a=r.items[o];e.push({imageUrl:await N(a.href),title:a.data[0].title,photographer:a.data[0].photographer,location:a.data[0].location,description:a.data[0].description,dateCreated:a.data[0].date_created.slice(0,10),keywords:a.data[0].keywords})}return e}catch(n){return console.warn(n),null}},N=async c=>{try{const t=await fetch(c);if(!t.ok)throw new Error("Failed to get image");const n=await t.json();return n[n.length-2]}catch(t){return console.warn(t),null}},O=async c=>{let t="";for(const[n,r]of Object.entries(c))t+=`${n}=${r.replaceAll(" ","%20")}&`;return t=t.slice(0,-1),await x(t,c.page_size)},D=async c=>{c.preventDefault();const t=Object.fromEntries(new FormData(form));for(const e in t)t[e]||delete t[e];const n=document.querySelector(".image-list"),r=await O(t);console.log(t),S(n,r)};async function T(c){A(c);const t=document.createElement("dialog");t.classList.add("modal");const n=document.createElement("button");n.id="close-modal",n.textContent="Close";const r=document.createElement("div");r.id="modal-content",t.append(n,r),c.append(t);const e=document.createElement("ul");e.classList.add("image-list"),c.append(e);const o=document.createElement("div");o.classList.add("image-info"),c.append(o);const a=await x();console.log("images",a),S(e,a),e.addEventListener("click",async s=>{s.target.tagName==="IMG"&&F(r,s.target),t.showModal()}),n.addEventListener("click",()=>{t.close()}),form.addEventListener("submit",D)}const $=document.querySelector("#app");T($);
