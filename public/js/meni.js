
     
fetch('/isLogged')
    .then(response => response.json())
    .then(data => {
        const isLogged = data.isLogged;
        const navList = document.querySelector('.primary-nav');

        while (navList.firstChild) {
            navList.removeChild(navList.firstChild);
        }

        if (isLogged) {
            const menuContainer = document.createElement('li');
            menuContainer.innerHTML = `
               <a id="profilLink" href="/profil.html"><strong>Profil</strong></a>
                <a href="/nekretnina.html"><strong>Nekretnine</strong></a>
               
               <form action="/logout" method="post" id="logoutForm">
                    <button type="submit"><strong>Odjava</strong></button>
                </form>`;
                
            navList.appendChild(menuContainer);
           
           

        } else {
            const menuItems = [
                '<li><a href="/nekretnina.html"><strong>Nekretnine</strong></a></li>',
                '<li><a href="/prijava.html"><strong>Prijava</strong></a></li>'
            ];
            navList.innerHTML = menuItems.join('');
        }
    });
