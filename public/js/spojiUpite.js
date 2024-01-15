prikaziUpite();

function prikaziUpite() {
    const pozivi = PoziviAjax();
    const nekretninaId = localStorage.getItem("id");
    pozivi.getUpiti(nekretninaId, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.log("Upiti: ", data); // dobijem dobre upite
            document.getElementById("postojeciUpiti").innerHTML = ``;

            var upiti = data;
            for (let i = 0; i < upiti.length; i++) {
                const upit = upiti[i];

                pozivi.getKorisnikId(upit.korisnikId, function (error, dataKorisnika) {
                    if (error) {
                        console.log(error);
                    } else {

                        var korisnik = dataKorisnika;
                        document.getElementById("postojeciUpiti").innerHTML += `<div class="upit" style="border: 1px solid black; padding: 10px; margin: 10px; background-color: white;">
                            <ul>
                                <li>
                                    <strong>${korisnik.username}</strong>
                                    <p>${upit.tekst_upita}</p>
                                </li>
                            </ul>
                        </div>`;
                    }
                });
            }
        }
    });
}
