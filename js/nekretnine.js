//import { SpisakNekretnina } from '../js/SpisakNekretnina.js';


function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
  // pozivanje metode za filtriranje
  
  const nekretnine=instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });

  const div=document.getElementById(divReferenca.id);
  if(!div){
    console.error(`Div with id ${divReferenca.id} not found.`);
    return;
  }

  let htmlContent='';
  

for(let nekretnina of nekretnine){
  if(nekretnina.tip_nekretnine=="Stan"){
    htmlContent+=`<div class="clan" id="stan1">

    <div class="slika-stana">
        <img src="../html/slike/stan1.jpg" alt="stan1">
    </div>
    <div class="lijeve-informacije">
        <p>Stan: ${nekretnina.naziv} </p>
        <p>Kvadratura: ${nekretnina.kvadratura} m&sup2; </p>
    </div>
    <div class="desne-informacije">
        <p>Cijena: ${nekretnina.cijena} KM</p>
    </div>
    <button class="detalji">Detalji</button>
</div>`
  }else if(nekretnina.tip_nekretnine=="Kuca"){
    htmlContent+=`<div class="clan" id="kuca1">

            
    <div class="slika-kuce">
        <img src="slike/kuca1.jpg" alt="kuca1">
    </div>
    <div class="lijeve-informacije">
        <p>Kuća: ${nekretnina.naziv}</p>
        <p>Kvadratura: ${nekretnina.kvadratura} m&sup2; </p>
    </div>
    <div class="desne-informacije">
        <p>Cijena: ${nekretnina.cijena} KM</p>
    </div>
    <button class="detalji">Detalji</button>
</div>`

  }else if(nekretnina.tip_nekretnine=="Poslovni prostor"){
    htmlContent+=`<div class="clan" id="pp1">
 
    <div class="slika-pp">
        <img src="slike/pp1.jpg" alt="pp1">
    </div>
    <div class="lijeve-informacije">
        <p>Poslovni: ${nekretnina.naziv}</p>
        <p>Kvadratura: ${nekretnina.kvadratura} m&sup2; </p>
    </div>
    <div class="desne-informacije">
        <p>Cijena: ${nekretnina.cijena} KM</p>
    </div>
    <button class="detalji">Detalji</button>
</div>`


  }
}
div.innerHTML=htmlContent;



}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

const listaNekretnina = [{
  id: 1,
  tip_nekretnine: "Stan",
  naziv: "Useljiv stan Sarajevo",
  kvadratura: 58,
  cijena: 232000,
  tip_grijanja: "plin",
  lokacija: "Novo Sarajevo",
  godina_izgradnje: 2019,
  datum_objave: "01.10.2023.",
  opis: "Sociis natoque penatibus.",
  upiti: [{
      korisnik_id: 1,
      tekst_upita: "Nullam eu pede mollis pretium."
  },
  {
      korisnik_id: 2,
      tekst_upita: "Phasellus viverra nulla."
  }]
},
{
  id: 2,
  tip_nekretnine: "Poslovni prostor",
  naziv: "Mali poslovni prostor",
  kvadratura: 20,
  cijena: 70000,
  tip_grijanja: "struja",
  lokacija: "Centar",
  godina_izgradnje: 2005,
  datum_objave: "20.08.2023.",
  opis: "Magnis dis parturient montes.",
  upiti: [{
      korisnik_id: 2,
      tekst_upita: "Integer tincidunt."
  }
  ]
}]

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

//instanciranje modula
let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, listaKorisnika);

//pozivanje funkcije
spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");

