document.getElementById('logoutForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const pozivi = PoziviAjax();
    console.log(pozivi);
    pozivi.postLogout(fnCallback);
});



function fnCallback(error, data) {
    if (error) {
        console.error('Greška:', error.message);
    } else {
        console.log('Odgovor:', data);
    }
}
