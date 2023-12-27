document.getElementById('userData').addEventListener('click', async function (event) {
    event.preventDefault();

    const pozivi=PoziviAjax();
   
   pozivi.getKorisnik(fnCallback);
});

function fnCallback(error, data) {
    if (error) {
        console.error('Greška:', error.message);
    }
    else {
        if (data) {
           
            document.getElementById('nameDisplay').textContent = data.ime;
            document.getElementById('surnameDisplay').textContent = data.prezime;
            document.getElementById('usernameDisplay').textContent = data.username;
            console.log('Podaci o korisniku:', data);
        } else {
            console.error();
        }
    }
}