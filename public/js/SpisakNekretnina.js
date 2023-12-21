
let SpisakNekretnina = function () {
    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];


    //implementacija metoda
    let init = function (ListaNekretnina, ListaKorisnika) {
        listaKorisnika = ListaKorisnika;
        listaNekretnina =ListaNekretnina;
    }


    let filtrirajNekretnine = function (kriterij) {

        let listaNekretninaPovratna = [];

        for (let i of listaNekretnina) {
            let NeodgovarajuciFilter= false;
            if (kriterij.tip_nekretnine != undefined && kriterij.tip_nekretnine != i.tip_nekretnine) {
                NeodgovarajuciFilter = true;
            }
            if (kriterij.min_cijena != undefined && kriterij.min_cijena > i.cijena) {
                NeodgovarajuciFilter = true;
            }
            if (kriterij.max_cijena != undefined && kriterij.max_cijena < i.cijena) {
                NeodgovarajuciFilter = true;
            } if (kriterij.min_kvadratura != undefined && kriterij.min_kvadratura > i.kvadratura) {
                NeodgovarajuciFilter = true;
            } if (kriterij.max_kvadratura != undefined && kriterij.max_kvadratura < i.kvadratura) {
                NeodgovarajuciFilter = true;
            }
            if (!NeodgovarajuciFilter)
                listaNekretninaPovratna.push(i);
        }

        return listaNekretninaPovratna;
    }

    let ucitajDetaljeNekretnine = function (id) {

        for (let i in listaNekretnina) {
            if (i.id == id) {
                return i;
            }
        }
        return null;

    }
    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};

//export {SpisakNekretnina}