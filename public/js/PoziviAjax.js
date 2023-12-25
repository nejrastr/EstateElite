//const bcrypt = require('bcrypt');

const PoziviAjax = (async () => {
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
            console.log('Podaci o korisniku:', data);
        }
    }
   
   
    const noviPodaci = {
        username: "timur",
        ime:"Nejra",
        prezime:"Strsevic",
       // password: await bcrypt.hash("maca123", 10)
        
    };


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
   



    function fnCallback(error, data) {
        if (error) {
            console.error('Greška:', error.message);
        } else {
            console.log('Odgovor:', data);
        }
    }

    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {

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
        xhr.onload = function () {
            if (xhr.status == 200) {
                var data = JSON.parse(this.responseText);
                fnCallback(null, data);
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
    function impl_postLogout(fnCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/logout', true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                var data = JSON.parse(this.responseText);
                fnCallback(null, data);
            } else {
                var error = new Error('Error while logging out');
                fnCallback(error, null);
            }

        };
        xhr.onerror = function () {
            var error = new Error('Error with request');
            fnCallback(error, null);
        };

        xhr.send();
    }


    impl_getKorisnik(fnCallback);
    //impl_putKorisnik(noviPodaci, fnCallback);
    // impl_getNekretnine(fnCallback);
    // impl_postLogout(fnCallback);
    //impl_postLogin("itsarmeon",
    // "1cde0f2b645d6212d4fc28bfc24cd9af",fnCallback);

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine
    };
})();
