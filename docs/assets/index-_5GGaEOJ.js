(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const d=document.createElement("div");d.id="filters";const L=(c,t,n,a,e="")=>{const o=document.createElement("label");o.htmlFor=t,o.textContent=n;const r=document.createElement("select");r.id=t,r.name=a;const s=document.createElement("option");s.value=e,s.textContent=e||"Any",s.selected="selected",r.append(s);for(const g of c){const m=document.createElement("option");m.value=g,m.textContent=g,r.append(m),d.append(o,r)}return r},C=c=>{const t=document.createElement("form");t.id="form";const n=document.createElement("h2");n.textContent="Search NASA Database:";const a=document.createElement("p");a.textContent="explain the form goofball";const e=document.createElement("label");e.htmlFor="search",e.textContent="type something -> ";const o=document.createElement("input");o.type="text",o.id="search",o.name="q";const r=document.createElement("h3");r.textContent="Apply filters: ",d.append(r);const s=["MOON","STAR","JUPITER","PLANET","ASTRONAUT","ASTEROID","BLACK HOLE","HUBBLE","GALAXY","SATELLITE"].sort();L(s,"keyword-filter","filter by keyword: ","keywords"),L(["Bridget Caswell","Eric Bordelon","Bill Ingalls","Josh Varcarcel","Desiree Stover","Bill Stafford","Jordan Salkin","Jeff Janis","Jim Ross","Norah Moran"],"photographer-filter","photographer: ","photographer"),L([10,30,50],"page-size-select","number of images: ","page_size",20);const f=document.createElement("div");f.id="year-inputs";const p=new Date().getFullYear(),i=document.createElement("input");i.type="number",i.min=1920,i.max=p,i.id="year-start",i.value=1920,i.name="year_start";const h=document.createElement("label");h.htmlFor=i.id,h.textContent="Year min: ";const l=document.createElement("input");l.type="number",l.min=1920,l.max=p,l.id="year-end",l.value=p,l.placeholder=`Max ${p}`,l.name="year_end";const E=document.createElement("label");E.htmlFor=l.id,E.textContent="Year max: ",f.append(h,i,E,l),d.append(f);const y=document.createElement("button");y.textContent="Search";const u=document.createElement("button");return u.type="reset",u.textContent="Reset Filters",t.append(n,a,e,o,d,y,u),c.append(t),{form:t,h2:n,formDesc:a,searchLabel:e,searchInput:o,filterDiv:d,submit:y,clearAll:u}},b=(c,t)=>{c.innerHTML="";for(const n of t){const a=document.createElement("li");a.classList.add("image");const e=document.createElement("img");e.src=n.imageUrl,e.alt=n.title,e.dataset.imageUrl=n.imageUrl,e.dataset.title=n.title,e.dataset.photographer=n.photographer??"Not Found",e.dataset.location=n.location??"Not Found",e.dataset.description=n.description??"Not Found",e.dataset.dateCreated=n.dateCreated??"Not Found",a.append(e),c.appendChild(a)}},x=(c,t)=>{c.innerHTML="";const n=document.createElement("h2");n.textContent=t.dataset.title;const a=document.createElement("h3");a.textContent=`Photographer: ${t.dataset.photographer}`;const e=document.createElement("img");e.src=t.dataset.imageUrl,e.alt=`A picture of ${t.dataset.title}`;const o=document.createElement("p");o.textContent=`Description: ${t.dataset.description}`;const r=document.createElement("p");r.textContent=`Location: ${t.dataset.location}`;const s=document.createElement("p");s.textContent=`Date: ${t.dataset.dateCreated}`,c.append(n,a,e,o,r,s)},S="https://images-api.nasa.gov/search",w=async(c="q=space",t=20)=>{try{const n=await fetch(`${S}?${c}&media_type=image`);if(!n.ok)throw new Error("Failed to get images");const{collection:a}=await n.json();console.log(a);const e=[];for(let o=0;o<t;o++){const r=a.items[o];e.push({imageUrl:await v(r.href),title:r.data[0].title,photographer:r.data[0].photographer,description:r.data[0].description,dateCreated:r.data[0].date_created,keywords:r.data[0].keywords})}return e}catch(n){return console.warn(n),null}},v=async c=>{try{const t=await fetch(c);if(!t.ok)throw new Error("Failed to get image");const n=await t.json();return n[n.length-2]}catch(t){return console.warn(t),null}},A=async c=>{let t="";for(const[n,a]of Object.entries(c))t+=`${n}=${a.replaceAll(" ","%20")}&`;return t=t.slice(0,-1),await w(t,c.page_size)},F=async c=>{c.preventDefault();const t=Object.fromEntries(new FormData(form));for(const e in t)t[e]||delete t[e];const n=document.querySelector(".image-list"),a=await A(t);console.log(t),b(n,a)};async function I(c){C(c);const t=document.createElement("dialog");t.classList.add("modal");const n=document.createElement("button");n.id="close-modal",n.textContent="Close";const a=document.createElement("div");a.id="modal-content",t.append(n,a),c.append(t);const e=document.createElement("ul");e.classList.add("image-list"),c.append(e);const o=document.createElement("div");o.classList.add("image-info"),c.append(o);const r=await w();console.log("images",r),b(e,r),e.addEventListener("click",async s=>{s.target.tagName==="IMG"&&x(a,s.target),t.showModal()}),n.addEventListener("click",()=>{t.close()}),form.addEventListener("submit",F)}const O=document.querySelector("#app");I(O);
