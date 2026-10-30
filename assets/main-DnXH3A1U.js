import{f as m}from"./countries-CpNU_s4I.js";function f(e){const t=e.name?.common??"Unknown",n=e.capital?.[0]??"—",a=e.population?.toLocaleString("en-US")??"—",p=e.region??"—",g=e.flags?.png??"",c=e.cca2?`https://flagcdn.com/w320/${e.cca2.toLowerCase()}.png`:"";return`
    <article class="card" data-code="${e.cca3}">

      <img
        class="flag"
        src="${g}"
        alt="${t} flag"
        loading="lazy"
        onerror="if ('${c}' && this.src !== '${c}') this.src = '${c}';"
      />
      
      <div class="card-body">
        <h3>${t}</h3>
        <p><b>Capital:</b> ${n}</p>
        <p><b>Population:</b> ${a}</p>
        <p><b>Region:</b> ${p}</p>
      </div>
    </article>
  `}function h(e){const t=document.createElement("div");return t.innerHTML=`
    <input class="input" id="searchInput" placeholder="Search country..." />
  `,t.querySelector("#searchInput").addEventListener("input",a=>e(a.target.value)),t}function v(e){const t=document.createElement("div");return t.innerHTML=`
    <select class="select" id="regionSelect">
      <option value="all">All regions</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  `,t.querySelector("#regionSelect").addEventListener("change",n=>{e(n.target.value)}),t}const s=document.querySelector("#grid"),o=document.querySelector("#status"),w=document.querySelector("#search"),L=document.querySelector("#filter");let d=[],u="",r="all";function l(){const e=d.filter(t=>(t.name?.common?.toLowerCase()??"").includes(u.toLowerCase())).filter(t=>r==="all"?!0:t.region===r);s.innerHTML=e.map(f).join(""),o.textContent=e.length===0?"No countries found.":""}async function C(){o.textContent="Loading countries...";try{d=await m(),o.textContent="",l()}catch(e){console.error(e),o.textContent="Error loading countries. Try again."}}w.appendChild(h(e=>{u=e,l()}));L.appendChild(v(e=>{r=e,l()}));s.addEventListener("click",e=>{const t=e.target.closest(".card");if(!t)return;const n=t.dataset.code;window.location.href=`details.html?code=${n}`});const i=document.getElementById("scrollTopBtn");window.addEventListener("scroll",()=>{window.scrollY>150?i.classList.add("show"):i.classList.remove("show")});i.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});C();
