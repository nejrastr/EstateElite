import { SpisakNekretnina } from '../js/SpisakNekretnina.js';


function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
  // pozivanje metode za filtriranje
  let divListaNekretnina=divReferenca.querySelector(".lista");
  let nekretnine=instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
  // iscrtavanje elemenata u divReferenca element
  divPp.innerHTML=`<div class="clan" id="stan1">

  <div class="slika-stana">
      <img src="../html/slike/stan1.jpg" alt="stan1">
  </div>
  <div class="lijeve-informacije">
      <p>Stan: Tihi okean</p>
      <p>Kvadratura: 70 m&sup2; </p>
  </div>
  <div class="desne-informacije">
      <p>Cijena: 180.000 KM</p>
  </div>
  <button class="detalji">Detalji</button>
</div>`


}

const divStan = document.getElementById("lista");
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
//spojiNekretnine(divStan, nekretnine, "Stan");
//spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");

