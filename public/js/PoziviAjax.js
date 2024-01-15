//const bcrypt = require('bcrypt');

const PoziviAjax = function () {
    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null


    // vraća korisnika koji je trenutno prijavljen na sistem


    function impl_getKorisnik(fnCallback) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/korisnik', true);
        // ovdje se pozove ako je uspjenso prosao request
        xhr.onload = function () {

            if (this.status == 200) {
                var data = JSON.parse(this.responseText);
                fnCallback(null, data);
            } else {
                var error = new Error('Error while reading currently logged user');
                fnCallback(error, null);
            }

        };
        // uopste nije uspio proci zahtjev da bi dobili bilo kakav odgovor :((
        xhr.onerror = function () {
            var error = new Error('Error during get request');
            fnCallback(error, null);
        };
        xhr.send();
    }

    function fnCallback(error, data) {
        if (error) {
            console.error('Greška:', error.message);
        } else {
            console.log('Odgovor:', data);
        }
    }




    // ažurira podatke loginovanog korisnika
    function impl_putKorisnik(noviPodaci, fnCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', '/korisnik', true);

        //bitno za pravilno parsiranje json podataka
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.status == 200) {
                var data = JSON.parse(xhr.responseText);
                fnCallback(null, data);

            } else {
                var error = new Error('Error while updating user data');
                fnCallback(error, null);
            }
        };
        xhr.onerror = function () {
            var error = new Error('Error with request');
            fnCallback(error, null);

        };

        var jsonData = JSON.stringify(noviPodaci);

        xhr.send(jsonData);


    }


    const tekst_upita = {
        tekst_upita: "radi li ovo"

    }

    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upit', true);

        //bitno za pravilno parsiranje json podataka
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.status == 200) {
                var data = JSON.parse(xhr.responseText);
                fnCallback(null, data);

            } else {
                var error = new Error('Error while adding query');
                fnCallback(error, null);
            }
        };
        xhr.onerror = function () {
            var error = new Error('Error with request');
            fnCallback(error, null);

        };
        var jsonData = JSON.stringify({ nekretnina_id: nekretnina_id, tekst_upita: tekst_upita });
        xhr.send(jsonData);



    }
    function impl_getUpiti(nekretnina_id, fnCallback){
        var xhr=new XMLHttpRequest();
        console.log("ID: ", nekretnina_id)
        xhr.open('GET', `/postojeciUpiti/`+nekretnina_id, true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
               
                fnCallback(null, data);
                console.log(data)
            } else {
                var error = new Error('Error while returning queries');
                fnCallback(error, null);
            }

        };
        xhr.onerror = function () {
            var error = new Error('Error with request');
            fnCallback(error, null);
        };

        xhr.send();


    }



    function impl_getNekretnine(fnCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/nekretnine', true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                var data = JSON.parse(this.responseText);
                fnCallback(null, data);
            } else {
                var error = new Error('Error while returning properties');
                fnCallback(error, null);
            }

        };
        xhr.onerror = function () {
            var error = new Error('Error with request');
            fnCallback(error, null);
        };

        xhr.send();
    }




     function impl_postLogin(username, password, fnCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                fnCallback(null, data);
                window.location.href = '/nekretnina.html';

            } else {
                var error = new Error('Error while logging in');
                fnCallback(error, null);
            }
        };

        xhr.onerror = function () {
            var error = new Error('Error with request');
            fnCallback(error, null);
        };

        var jsonData = JSON.stringify({ username: username, password: password });
        xhr.send(jsonData);
       
    }

      function impl_postLogout(fnCallback) {
        xhr = new XMLHttpRequest();
        xhr.open('POST', '/logout', true);
        xhr.onload = function () {
            if (xhr.status == 200 ) {
               
                var data = JSON.parse(xhr.responseText);
                fnCallback(null, data);
             
                window.location.href = '/prijava.html';



            } else {
                var error = new Error('Error while logging in');
                fnCallback(error, null);

            }
        };

        xhr.onerror = function () {
            var error = new Error('Error with request');
            fnCallback(error, null);
        };

        xhr.send();
     


    }

    function impl_getNekretninaById(nekretninaId, fnCallback){
        xhr=new XMLHttpRequest();
        xhr.open('GET', '/nekretnina/'+nekretninaId, true);
        xhr.onload=function(){
            if(xhr.status==200){
                let data=JSON.parse(this.responseText);

                console.log("podaci: ", data) ;
                
                fnCallback(null,data);
               // window.location.href = `detalji.html?id=${nekretninaId}`;
            }else{
                var error=new Error('Error with getting property by id');
                fnCallback(error, null);
            }
        };

        xhr.onerror=function(){
            var error=new Error('Error with request');
            fnCallback(error, null);
        };
        xhr.send();
    }

    function impl_getKorisnikId(korisnikId, fnCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/korisnikId/' + korisnikId, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    
        xhr.onload = function () {
            if (xhr.status == 200) {
                let data = JSON.parse(this.responseText);
                console.log("Podaci:", data);
                fnCallback(null, data);
            } else {
                var error = new Error('Error with getting user by id');
                fnCallback(error, null);
            }
        };
    
        xhr.onerror = function () {
            var error = new Error('Error with request');
            fnCallback(error, null);
        };
    
        xhr.send();
    }
    

    
    //impl_getKorisnikId(1,fnCallback);
//impl_getKorisnik(fnCallback);
//impl_putKorisnik(noviPodaci,fnCallback);
//impl_postUpit(1,tekst_upita,fnCallback);
//impl_getNekretnine(fnCallback);
    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine,
        getNekretninaById:impl_getNekretninaById,
        getUpiti: impl_getUpiti,
        getKorisnikId: impl_getKorisnikId

    };
}
