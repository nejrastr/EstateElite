

 window.onload= function(){
  const pozivi = PoziviAjax();
    let detaljiID=localStorage.getItem("id")
  pozivi.getNekretninaById(detaljiID, function (error, data) {
    //console.log("ID", detaljiID)
    if (error) {
   
      console.error(error);
    } else {
       
        const detaljiContainer = document.getElementById("detaljiNekretnine");
       
        //console.log(detaljiContainer)
        console.log(data)
        detaljiContainer.innerHTML = `
        <div id="osnovno">
          <p><strong>Naziv</strong>: ${data.naziv}</p>
          <p><strong>Kvadratura:</strong> ${data.kvadratura} m&sup2;</p>
          <p><strong>Cijena:</strong> ${data.cijena} KM</p>
        </div>
        <div id="detalji">
          <p><strong>Lokacija:</strong> ${data.lokacija}</p>
          <p><strong>Tip grijanja:</strong> ${data.tip_grijanja}</p>
          <p><strong>Opis:</strong>${data.opis}</p>
        </div>
       
      `;
      
     
   
    }
  });
}
