
const sequelizeDB=require('./baza.js');


sequelizeDB.sequelize.sync({force:true}).then(function(){
    inicializacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicializacija(){
    var listaKorisnika=[];
    var listaNekretnina=[];
   var listaUpita=[];

    return new Promise(function(resolve,reject){
        listaKorisnika.push(sequelizeDB.korisnik.create({ime:"Nejra",prezime:"Strsevic", username:"nejrastr",password:"$2b$10$QBcntXS.qs1QXZod95Iik.E8mG5uO64RFO9LUBXRmAjEduXeFKVEu" }));
        listaKorisnika.push(sequelizeDB.korisnik.create({ime:"Arman",prezime:"Hadzigrahic", username:"itsarmeon",password:"$2b$10$YhN0vtstfuzqXJtaQuw.YOsHMcMaR/kmKyP0dT.XZhTsh8li2Hav." }));
        Promise.all(listaKorisnika).then(function(){});

        listaNekretnina.push(sequelizeDB.nekretnina.create({tip_nekretnine: "Stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 58,
        cijena: 232000,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus."}));
        listaNekretnina.push(sequelizeDB.nekretnina.create({ tip_nekretnine: "Poslovni prostor",
        naziv: "Mali poslovni prostor",
        kvadratura: 20,
        cijena: 70000,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes."})); 
        listaNekretnina.push(sequelizeDB.nekretnina.create({tip_nekretnine: "Kuca",
        naziv: "Kuca Sarajevo",
        kvadratura: 100,
        cijena: 300000,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus."})); 
        listaNekretnina.push(sequelizeDB.nekretnina.create({tip_nekretnine: "Stan",
        naziv: "Garsonjera Sarajevo",
        kvadratura: 30,
        cijena: 52000,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus."})); 
        listaNekretnina.push(sequelizeDB.nekretnina.create({ tip_nekretnine: "Stan",
        naziv: "Veliki Sarajevo",
        kvadratura: 200,
        cijena: 400000,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus."})); 
        listaNekretnina.push(sequelizeDB.nekretnina.create({tip_nekretnine: "Kuca",
        naziv: "Porodicna kuca Sarajevo",
        kvadratura: 120,
        cijena: 150000,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus."}));
         listaNekretnina.push(sequelizeDB.nekretnina.create({  tip_nekretnine: "Kuca",
         naziv: "Luksuzna kuca Sarajevo",
         kvadratura: 200,
         cijena: 500000,
         tip_grijanja: "plin",
         lokacija: "Novo Sarajevo",
         godina_izgradnje: 2019,
         datum_objave: "01.10.2023.",
         opis: "Sociis natoque penatibus."}));
         listaNekretnina.push(sequelizeDB.nekretnina.create({   tip_nekretnine: "Poslovni prostor",
         naziv: "Poslovni prostor Sarajevo",
         kvadratura: 30,
         cijena: 80000,
         tip_grijanja: "plin",
         lokacija: "Novo Sarajevo",
         godina_izgradnje: 2019,
         datum_objave: "01.10.2023.",
         opis: "Sociis natoque penatibus."
         }));  
         listaNekretnina.push(sequelizeDB.nekretnina.create({  tip_nekretnine: "Poslovni prostor",
         naziv: "Sala Sarajevo",
         kvadratura: 100,
         cijena: 100000,
         tip_grijanja: "plin",
         lokacija: "Novo Sarajevo",
         godina_izgradnje: 2019,
         datum_objave: "01.10.2023.",
         opis: "Sociis natoque penatibus."}));

        Promise.all(listaNekretnina).then(function(){});

        
        listaUpita.push(sequelizeDB.upit.create({nekretninaId:1, korisnikId: 1, tekst_upita:"radi li ovo"}));
        listaUpita.push(sequelizeDB.upit.create({nekretninaId:2, korisnikId: 2, tekst_upita:"Integer tincidunt."}));
        listaUpita.push(sequelizeDB.upit.create({nekretninaId:3, korisnikId: 1, tekst_upita:"radi li ovo"}));
        listaUpita.push(sequelizeDB.upit.create({nekretninaId:5, korisnikId: 1, tekst_upita:"radi li ovo"}));
        listaUpita.push(sequelizeDB.upit.create({nekretninaId:8, korisnikId: 2, tekst_upita:"radi li ovo"}));
        Promise.all(listaUpita).then(function(){});




    });

}