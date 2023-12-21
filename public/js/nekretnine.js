


function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
  
  
  const nekretnine=instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });

  const div=document.getElementById(divReferenca.id);
  if(!div){
    console.error(`Div  ${divReferenca.id} ne postoji.`);
    return;
  }

  let htmlContent='';
  

for(let nekretnina of nekretnine){
  if(nekretnina.tip_nekretnine=="Stan"){
    let slikica="https://cf.bstatic.com/xdata/images/hotel/max1024x768/405853412.jpg?k=932650159998bb96a4a481b6f4ef49923ede2d1a35d558100b516ecf7ac200f1&o=&hp=1";
    htmlContent+=`<div class="clan" id="stan1">

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
    <button class="detalji">Detalji</button>
</div>`
  }else if(nekretnina.tip_nekretnine=="Kuca"){
    let slikica="https://www.nekretnineinn.ba/wp-content/uploads/2018/02/Moderna-lepotica-Ku%C4%87a-koja-%C4%87e-vas-osvojiti-na-prvi-pogled-8-830x458.jpg";
    htmlContent+=`<div class="clan" id="kuca1">
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
    <button class="detalji">Detalji</button>
</div>`

  }else if(nekretnina.tip_nekretnine=="Poslovni prostor"){

    let slikica="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQcciBvTK6W7VhHbVRPkezVWjPwQWQnprvA&usqp=CAU";
    htmlContent+=`<div class="clan" id="pp1">
 
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
},{
  id: 3,
  tip_nekretnine: "Stan",
  naziv: "Mali useljiv stan Sarajevo",
  kvadratura: 40,
  cijena: 32000,
  tip_grijanja: "plin",
  lokacija: "Novo Sarajevo",
  godina_izgradnje: 2016,
  datum_objave: "01.12.2020.",
  opis: "Sociis natoque penatibus.",
  upiti: [{
      korisnik_id: 1,
      tekst_upita: "Nullam eu pede mollis pretium."
  },
  {
      korisnik_id: 2,
      tekst_upita: "Phasellus viverra nulla."
  }]
},{
  id: 4,
  tip_nekretnine: "Kuca",
  naziv: "Porodicna kuca Sarajevo",
  kvadratura: 100,
  cijena: 200000,
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
},{
  id: 5,
  tip_nekretnine: "Kuca",
  naziv: "Kuca s pogledom",
  kvadratura: 200,
  cijena: 500000,
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
},{
  id: 6,
  tip_nekretnine: "Poslovni prostor",
  naziv: "Poslovni prostor u Centru",
  kvadratura: 100,
  cijena: 232000,
  tip_grijanja: "plin",
  lokacija: "Sarajevo Centar",
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
},{
  id: 7,
  tip_nekretnine: "Poslovni prostor",
  naziv: "Poslovni prostor u Centru",
  kvadratura: 100,
  cijena: 232000,
  tip_grijanja: "plin",
  lokacija: "Sarajevo Centar",
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
},{
  id: 8,
  tip_nekretnine: "Poslovni prostor",
  naziv: "Poslovni prostor u Centru",
  kvadratura: 100,
  cijena: 232000,
  tip_grijanja: "plin",
  lokacija: "Sarajevo Centar",
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
},{
  id: 9,
  tip_nekretnine: "Stan",
  naziv: "Stan Ilidza",
  kvadratura: 100,
  cijena: 12000,
  tip_grijanja: "plin",
  lokacija: "Ilidza",
  godina_izgradnje: 2018,
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
},{
  id: 10,
  tip_nekretnine: "Stan",
  naziv: "Stan Stari grad",
  kvadratura: 100,
  cijena: 232000,
  tip_grijanja: "plin",
  lokacija: "Bascarsija",
  godina_izgradnje: 1987,
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
},{
  id: 11,
  tip_nekretnine: "Kuca",
  naziv: "Kuca oaza",
  kvadratura: 100,
  cijena: 300000,
  tip_grijanja: "pumpa",
  lokacija: "Sarajevo Centar",
  godina_izgradnje: 2013,
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
},{
  id: 12,
  tip_nekretnine: "Kuca",
  naziv: "Porodicna idila",
  kvadratura: 100,
  cijena: 232000,
  tip_grijanja: "plin",
  lokacija: "Sarajevos",
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
spojiNekretnine(divKuca, nekretnine, "Kuca");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");

