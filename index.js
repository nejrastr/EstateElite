const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
//const sequelizeDB=require('./data/baza.js');





//const modul= require('./public/js/SpisakNekretnina').default; 
const app = express();

app.use(session({
  secret: '6e3aac184678cfa60896fabe3438158060337e8877e15f51dd89f99cc96dc795',
  resave: true,
  saveUninitialized: true
}));





let isLogged = false;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'html')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));





app.post('/login', async (req, res) => {
  const korisnici = JSON.parse(fs.readFileSync('data/korisnici.json', 'utf-8'));
  const { username, password } = req.body;

  // const hashedPassword = await bcrypt.hash(password, 10)

  let korisnik = null;

  for (let i = 0; i < korisnici.length; i++) {
    if (korisnici[i].username === username) {
      korisnik = korisnici[i];

      // korisnici[i].password = hashedPassword
      break;
    }
  }

  // console.log(hashedPassword)


  // console.log(korisnici)

  // fs.writeFileSync('data/korisnici.json', JSON.stringify(korisnici, null, 2));

  if (korisnik && await bcrypt.compare(password, korisnik.password)) {
    req.session.username = username;
    isLogged = true;
    res.status(200).json({ poruka: 'Uspjesna prijava' });
  } else {
    res.status(401).json({ greska: 'Neuspjesna prijava' });
  }
});


//ruta logout
app.post('/logout', (req, res) => {
  if (req.session.username) {

    req.session.destroy((err) => {
      if (err) {
        throw err;
      } else {
        isLogged = false;
        res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
      }
    });
  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });

  }

});
//ruta 
app.get('/korisnik', (req, res) => {

  if (req.session.username) {
    //console.log('Sesija korisnika:', req.session.username);
    const korisnici = JSON.parse(fs.readFileSync('data/korisnici.json', 'utf-8'));
    const korisnik = korisnici.find((user) => user.username === req.session.username);
    if (korisnik) {
      const { id, ime, prezime, username, password } = korisnik;
      res.status(200).json({ id, ime, prezime, username, password });
    }
    else {
      res.status(401).json({ greska: "Korisnik ne postoji" });
    }

  } else {
    res.status(401).json({ greska: 'Neautorizovan pristup' });
  }

});
app.get('/isLogged', (req, res) => {
  res.json({ isLogged });
});

app.post('/upit', (req, res) => {
  //console.log('Username in session:', req.session.username);

  if (req.session.username) {

    const nekretnine = JSON.parse(fs.readFileSync('data/nekretnine.json', 'utf8'));
    const korisnici = JSON.parse(fs.readFileSync('data/korisnici.json', 'utf-8'));
    const korisnik = korisnici.find((user) => user.username === req.session.username);

    const { nekretnina_id, tekst_upita } = req.body;
    const korisnikId = korisnik.id;

    const nekretnina = nekretnine.find(posjed => posjed.id == nekretnina_id);


    if (!nekretnina) {

      return res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
    }

    if (!nekretnina.upiti) {
      nekretnina.upiti = [];
    }

    nekretnina.upiti.push({ korisnik_id: korisnikId, tekst_upita });
    //radi dodavanje upita

    fs.writeFileSync('data/nekretnine.json', JSON.stringify(nekretnine, null, 2));
    res.status(200).json({ poruka: 'Upit je uspješno dodan' });
  } else {
    // console.log('Neautorizovan pristup');
    return res.status(401).json({ greska: 'Neautorizovan pristup' });
  }

});

app.put('/korisnik', (req, res) => {
  if (req.session.username) {

    const korisnici = JSON.parse(fs.readFileSync('data/korisnici.json', 'utf8'));
    const { ime, prezime, username, password } = req.body;

    const user = korisnici.find(u => u.username === req.session.username);

    if (user) {

      user.ime = ime;
    }
    if (prezime) {
      user.prezime = prezime;
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }

    fs.writeFileSync('data/korisnici.json', JSON.stringify(korisnici, null, 2));
    res.status(200).json({ poruka: 'Podaci su uspjesno azurirani' });

  } else {
    res.status(401).json({ greska: 'Neautorizovan prisup' });
  }

});
app.get('/nekretnine', (req, res) => {
  const nekretnine = JSON.parse(fs.readFileSync('data/nekretnine.json', 'utf8'));
  res.status(200).json(nekretnine);
});


app.get('/nekretnina/:id', (req, res) => {
  const { id } = req.body;

  // Check if id is a valid integer
  const nekretninaId = parseInt(id);
  if (isNaN(nekretninaId) || nekretninaId <= 0) {
    return res.status(400).json({ greska: 'Invalid nekretnina ID' });
  }

  try {
    const nekretnineData = fs.readFileSync('data/nekretnine.json', 'utf8');
    const nekretnine = JSON.parse(nekretnineData);

    const foundNekretnina = nekretnine.find((nekretnina) => nekretnina.id === nekretninaId);

    if (foundNekretnina) {
      res.status(200).json(foundNekretnina);
    } else {
      res.status(400).json({ greska: `Nekretnina sa id-em ${nekretninaId} ne postoji` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ greska: 'Internal Server Error' });
  }
});


app.post('/marketing/nekretnine', (req, res) => {
  const { nizNekretnina } = req.body;
  const trenutnePreferencije = fs.readFileSync('data/preferencije.json', 'utf-8');
  let preferencije = JSON.parse(trenutnePreferencije);

  nizNekretnina.forEach((id) => {
    const objekat = preferencije.find((element) => element.id === id);
    if (objekat) {
      objekat.pretrage += 1;
    } else {
      preferencije.push({
        id: id,
        pretrage: 1,
        klikovi: 0
      });
    }

  });
  
  fs.writeFileSync('data/preferencije.json', JSON.stringify(preferencije, null, 2));
  res.status(200).json({ poruka: 'Uspjesno poslani IDijevi' });
});

app.post('/marketing/nekretnina/:id', (req, res) => {
  try {
    const id = req.params.id; 
    const trenutnePreferencije = fs.readFileSync('data/preferencije.json', 'utf-8');
    let preferencije = JSON.parse(trenutnePreferencije);

    const index = preferencije.findIndex((element) => element.id === id);
    if (index !== -1) {
      preferencije[index].klikovi += 1;
    } else {
      preferencije.push({
        id: parseInt(idNekretnine), 
        pretrage: 1,
        klikovi: 1
      });
    }

    fs.writeFileSync('data/preferencije.json', JSON.stringify(preferencije, null, 2));
    res.status(200).json({ poruka: 'Zahtjev uspješno poslan' });
  } catch (error) {
    console.error('Error in /marketing/nekretnina/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/marketing/osvjezi', (req, res) => {
  try {
      const { nizNekretnina } = req.body;

      if (nizNekretnina) {
        
          const trenutnePreferencije = fs.readFileSync('data/preferencije.json', 'utf-8');
          let preferencije = JSON.parse(trenutnePreferencije);

          const promijenjeneNekretnine = preferencije.filter(nekretnina => nizNekretnina.includes(nekretnina.id));

          if (JSON.stringify(promijenjeneNekretnine) !== JSON.stringify(preferencije)) {
              promijenjeneNekretnine.forEach(nekretnina => {
                  const index = preferencije.findIndex(element => element.id === nekretnina.id);
                  if (index !== -1) {
                      preferencije[index].pretrage += 1;
                  }
              });

            
              fs.writeFileSync('data/preferencije.json', JSON.stringify(preferencije, null, 2));

             
              res.status(200).json({ nizNekretnina: promijenjeneNekretnine });
          } else {
             
              res.status(200).json({});
          }
      } else {
          
          res.status(400).json({ error: 'Neispravno tijelo zahtjeva' });
      }
  } catch (error) {
     
      res.status(500).json({ error: 'server error' });
  }
});

  
 





app.listen(3000, () => {
  console.log("Uspješno otvaranje porta 3000");
});