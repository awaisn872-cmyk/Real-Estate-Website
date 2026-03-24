
const form = document.getElementById("form");
const list = document.getElementById("list");

form.addEventListener("submit", async e=>{
e.preventDefault();

const data = new FormData(form);

await fetch("/api/properties",{
method:"POST",
body:data
});

form.reset();
load();
});

async function load(){
const res = await fetch("/api/properties");
const data = await res.json();

list.innerHTML="";

data.forEach(p=>{
list.innerHTML+=`
<div class="card">
<h3>${p.title}</h3>
<img src="/uploads/${p.image}" width="200">
<p>Price: $${p.price}</p>
<p>${p.location}</p>
<p>${p.description}</p>
</div>
`
});
}

load();
