provjeriPrijavu();

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

function provjeriPrijavu() {
  
    fetch("/isLogged")
      .then((response) => response.json())
      .then((data) => {
        const isLogged = data.isLogged;
        console.log("Da li je prijavljen: ", isLogged);
        if(isLogged){
            document.getElementById("dodaniUpiti").style.display='block';
            document.getElementById("upitButton").onclick=function(event){
                event.preventDefault();
                let id=localStorage.getItem("id");
                let tekst=document.getElementById("upitiTekst").value;
                const pozivi=PoziviAjax();
                pozivi.postUpit(id,tekst,function(error,data){
                    if(error){
                        alert("Neuspjesno dodan upit");
                        document.getElementById("dodaniUpiti").style.display='none';
                    }else{
                        document.getElementById("dodaniUpiti").value="";
                        prikaziUpite();
                        alert("Uspjesno dodan upit");
                    }
                })
            }

        }else{
            document.getElementById("dodaniUpiti").style.display = 'none';
        }
    
      })
      .catch((error) => {
        console.error("Greška prilikom dohvaćanja informacija o prijavi:", error);
      });
  }
 
 
  

