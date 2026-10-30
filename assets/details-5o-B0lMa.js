import{a as d}from"./countries-CpNU_s4I.js";function b(e){const t=e.name?.common??"Unknown",o=e.flags?.svg??e.flags?.png??"",i=e.capital?.[0]??"—",c=e.region??"—",r=e.population?.toLocaleString("en-US")??"—",l=e.languages?Object.values(e.languages).join(", "):"—",g=e.currencies?Object.values(e.currencies).map(a=>`${a.name} (${a.symbol??""})`.trim()).join(", "):"—",p=e.borders?.join(", ")??"—";return`
    <div class="details-card">
      <img class="flag-big" src="${o}" alt="${t} flag" />
      <div>
        <h2>${t}</h2>
        <p><b>Capital:</b> ${i}</p>
        <p><b>Region:</b> ${c}</p>
        <p><b>Population:</b> ${r}</p>
        <p><b>Languages:</b> ${l}</p>
        <p><b>Currencies:</b> ${g}</p>
        <p><b>Borders:</b> ${p}</p>
      </div>
    </div>
  `}const u=document.querySelector("#details"),n=document.querySelector("#status"),m=new URLSearchParams(window.location.search),s=m.get("code");async function $(){if(!s){n.textContent="Missing country code.";return}n.textContent="Loading details...";try{const e=await d(s);u.innerHTML=b(e),n.textContent=""}catch(e){console.error(e),n.textContent="Error loading details."}}$();
