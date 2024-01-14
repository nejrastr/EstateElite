


function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine, filterCriteria) {
  
  
  const nekretnine=instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine,...filterCriteria, });

  const div=document.getElementById(divReferenca.id);
  if(!div){
    console.error(`Div  ${divReferenca.id} ne postoji.`);
    return;
  }

  let htmlContent='';
  

for(let nekretnina of nekretnine){
  if(nekretnina.tip_nekretnine=="Stan"){
    let slikica="https://cf.bstatic.com/xdata/images/hotel/max1024x768/405853412.jpg?k=932650159998bb96a4a481b6f4ef49923ede2d1a35d558100b516ecf7ac200f1&o=&hp=1";
    detaljiID = `${nekretnina.id}`;

    htmlContent+=`<div class="clan" id="${detaljiID}">
    
    <div class="slika-stana">
        <img src="${slikica}" alt="stan1">
    </div>
    <div class="lijeve-informacije">
        <p>Naziv: ${nekretnina.naziv} </p>
        <p>Kvadratura: ${nekretnina.kvadratura} m&sup2; </p>
    </div>
    <div class="desne-informacije">
        <p>Cijena: ${nekretnina.cijena} KM</p>
    </div>
    <button class="detalji" onclick="expandGrid(this)">Detalji</button>
    <div class="dodatne-info" style="display: none;">
    <p>Lokacija: ${nekretnina.lokacija}</p>
    <p>Godina izgradnje: ${nekretnina.godina_izgradnje}</p>
    <button class="otvori-detalje" onClick="prikaziDetalje('${detaljiID}')" >Otvori detalje</button>
    </div>
</div>`
  }else if(nekretnina.tip_nekretnine=="Kuca"){
    let slikica="https://www.nekretnineinn.ba/wp-content/uploads/2018/02/Moderna-lepotica-Ku%C4%87a-koja-%C4%87e-vas-osvojiti-na-prvi-pogled-8-830x458.jpg";
    detaljiID = `${nekretnina.id}`;

    htmlContent+=`<div class="clan" id="${detaljiID}">
   <div class="slika-kuce">
        <img src="${slikica}" alt="kuca1">
    </div>
    <div class="lijeve-informacije">
        <p>Naziv: ${nekretnina.naziv}</p>
        <p>Kvadratura: ${nekretnina.kvadratura} m&sup2; </p>
    </div>
    <div class="desne-informacije">
        <p>Cijena: ${nekretnina.cijena} KM</p>
    </div>
    <button class="detalji" onclick="expandGrid(this)">Detalji</button>
    <div class="dodatne-info" style="display: none;">
    <p>Lokacija: ${nekretnina.lokacija}</p>
    <p>Godina izgradnje: ${nekretnina.godina_izgradnje}</p>
    <button class="otvori-detalje" onClick="prikaziDetalje('${detaljiID}')">Otvori detalje</button>
    </div>
</div>`

  }else if(nekretnina.tip_nekretnine=="Poslovni prostor"){

    let slikica="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQcciBvTK6W7VhHbVRPkezVWjPwQWQnprvA&usqp=CAU";
    detaljiID = `${nekretnina.id}`;

    htmlContent+=`<div class="clan" id="${detaljiID}">
 
    <div class="slika-pp">
        <img src="${slikica}" alt="pp1">
    </div>
    <div class="lijeve-informacije">
        <p>Naziv: ${nekretnina.naziv}</p>
        <p>Kvadratura: ${nekretnina.kvadratura} m&sup2; </p>
    </div>
    <div class="desne-informacije">
        <p>Cijena: ${nekretnina.cijena} KM</p>
    </div>
    <button class="detalji" onclick="expandGrid(this)">Detalji</button>
    <div class="dodatne-info" style="display: none;">
    <p>Lokacija: ${nekretnina.lokacija}</p>
    <p>Godina izgradnje: ${nekretnina.godina_izgradnje}</p>
    <button class="otvori-detalje" onClick="prikaziDetalje('${detaljiID}')">Otvori detalje</button>
    </div>
</div>`


  }
}
div.innerHTML=htmlContent;



}
////////////////////////////////////////////////////
function expandGrid(button) {
  const clanDiv = button.closest('.clan');
  const dodatneInformacije=clanDiv.querySelector('.dodatne-info');

  clanDiv.classList.toggle('clan-expanded');

  if (clanDiv.classList.contains('clan-expanded')) {
    dodatneInformacije.style.display = 'block';
  } else {
    dodatneInformacije.style.display = 'none';
  }
}
const detaljiButtons = document.querySelectorAll('.detalji');
detaljiButtons.forEach(button => {
  button.addEventListener('click', function () {
    expandGrid(this);
  });
});
////////////////////////////////////////////////////////
const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");
//////////////////////////////////////////////////
let nekretnine = SpisakNekretnina();
const pozivi=PoziviAjax();
pozivi.getNekretnine(function(err,data){
  const listaKorisnika = [{
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
  },
  {
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
  }]
  if(err==null){
    
    const listaNekretnina=data;
 
    nekretnine.init(listaNekretnina, listaKorisnika);
    
  }
  spojiNekretnine(divStan, nekretnine, "Stan");
  spojiNekretnine(divKuca, nekretnine, "Kuca");
  spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
  
})


function prikaziDetalje(detaljiID) {
 
  localStorage.setItem("id",detaljiID);
  window.location.href = `detalji.html?id=${detaljiID}`;
}

//instanciranje modula



//pozivanje funkcije

