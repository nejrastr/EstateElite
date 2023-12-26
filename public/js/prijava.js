document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

     const pozivi=PoziviAjax();
     //console.log(pozivi)
    pozivi.postLogin(username, password, fnCallback);
});

function fnCallback(error, data) {
    if (error) {
        console.error('Greška:', error.message);
    } else {
        console.log('Podaci o korisniku:', data);
    }
}