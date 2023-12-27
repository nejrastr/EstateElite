window.onload = function (){
    if(document.getElementById('logoutForm')!= null)
   { document.getElementById('logoutForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const pozivi = PoziviAjax();
       
        pozivi.postLogout(fnCallback);
   });}
}

//document.getElementById('logoutForm').addEventListener('submit', async function (event) {
    //event.preventDefault();
    //const pozivi = PoziviAjax();
   
   // pozivi.postLogout(fnCallback);
//});



function fnCallback(error, data) {
    if (error) {
        console.error('Greška:', error.message);
    } else {
        console.log('Odgovor:', data);
    }
}
