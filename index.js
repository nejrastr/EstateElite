const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const sequelizeDB = require("./data/baza.js");

//const modul= require('./public/js/SpisakNekretnina').default;
const app = express();

app.use(
  session({
    secret: "6e3aac184678cfa60896fabe3438158060337e8877e15f51dd89f99cc96dc795",
    resave: true,
    saveUninitialized: true,
  })
);

let isLogged = false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "html")));
app.use("/css", express.static(path.join(__dirname, "public", "css")));
app.use("/js", express.static(path.join(__dirname, "public", "js")));

app.post("/login", async (req, res) => {
  // const korisnici = JSON.parse(fs.readFileSync('data/korisnici.json', 'utf-8'));
  const { username, password } = req.body;
  try {
    const user = await sequelizeDB.korisnik.findOne({
      where: { username: username },
    });
    console.log("User found:", user);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        isLogged = true;
        req.session.username = username;
        res.status(200).json({ poruka: "Uspješna prijava" });
      } else {
        res.status(401).json({ greska: "Neuspješna prijava" });
      }
    } else {
      res.status(401).json({ greska: "Neuspješna prijava" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ greska: "Internal Server Error" });
  }
});

//ruta logout
app.post("/logout", (req, res) => {
  if (req.session.username) {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      } else {
        isLogged = false;
        res.status(200).json({ poruka: "Uspješno ste se odjavili" });
      }
    });
  } else {
    res.status(401).json({ greska: "Neautorizovan pristup" });
  }
});
//ruta
app.get("/korisnik", async (req, res) => {
  if (req.session.username) {
    //console.log('Sesija korisnika:', req.session.username);
    // const korisnici = JSON.parse(fs.readFileSync('data/korisnici.json', 'utf-8'));
    // const korisnik = korisnici.find((user) => user.username === req.session.username);
    const user = await sequelizeDB.korisnik.findOne({
      where: {
        username: req.session.username,
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ greska: "Korisnik ne postoji" });
    }
  } else {
    res.status(401).json({ greska: "Neautorizovan pristup" });
  }
});
app.get("/isLogged", (req, res) => {
  res.json({ isLogged });
});

app.post("/upit", async (req, res) => {
  if (req.session.username) {
    const { nekretnina_id, tekst_upita } = req.body;
    const korisnik = await sequelizeDB.korisnik.findOne({
      where: { username: req.session.username },
    });
    if (!korisnik) {
      return res.status(401).json({ greska: "Korisnik nije pronadjen" });
    }

    const nekretnina = await sequelizeDB.nekretnina.findByPk(nekretnina_id);

    if (!nekretnina) {
      return res
        .status(400)
        .json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
    }

    const noviUpit = await sequelizeDB.upit.create({
      korisnikId: korisnik.id,
      nekretninaId: nekretnina.id,
      tekst_upita,
    });

    res.status(200).json({ poruka: "Upit je uspješno dodan", upit: noviUpit });
  } else {
    return res.status(401).json({ greska: "Neautorizovan pristup" });
  }
});

app.put("/korisnik", async (req, res) => {
  if (req.session.username) {
   
    const { ime, prezime, username, password } = req.body;

    const korisnik=await sequelizeDB.korisnik.findOne({where:{username:req.session.username}});

    if (korisnik) {
      korisnik.ime = ime;
    }
    if (prezime) {
      korisnik.prezime = prezime;
    }
    if (username) {
      korisnik.username = username;
    }
    if (password) {
     korisnik.password = bcrypt.hashSync(password, 10);
    }

   await korisnik.save();
    res.status(200).json({ poruka: "Podaci su uspjesno azurirani" });
  } else {
    res.status(401).json({ greska: "Neautorizovan prisup" });
  }
});
app.get("/nekretnine", async (req, res) => {
  const nekretnine=await sequelizeDB.nekretnina.findAll();
  res.status(200).json(nekretnine);
});

app.get("/nekretnina/:id", (req, res) => {
  const { id } = req.body;

  // Check if id is a valid integer
  const nekretninaId = parseInt(id);
  if (isNaN(nekretninaId) || nekretninaId <= 0) {
    return res.status(400).json({ greska: "Invalid nekretnina ID" });
  }

  try {
    const nekretnineData = fs.readFileSync("data/nekretnine.json", "utf8");
    const nekretnine = JSON.parse(nekretnineData);

    const foundNekretnina = nekretnine.find(
      (nekretnina) => nekretnina.id === nekretninaId
    );

    if (foundNekretnina) {
      res.status(200).json(foundNekretnina);
    } else {
      res
        .status(400)
        .json({ greska: `Nekretnina sa id-em ${nekretninaId} ne postoji` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ greska: "Internal Server Error" });
  }
});

app.post("/marketing/nekretnine", (req, res) => {
  const { nizNekretnina } = req.body;
  const trenutnePreferencije = fs.readFileSync(
    "data/preferencije.json",
    "utf-8"
  );
  let preferencije = JSON.parse(trenutnePreferencije);

  nizNekretnina.forEach((id) => {
    const objekat = preferencije.find((element) => element.id === id);
    if (objekat) {
      objekat.pretrage += 1;
    } else {
      preferencije.push({
        id: id,
        pretrage: 1,
        klikovi: 0,
      });
    }
  });

  fs.writeFileSync(
    "data/preferencije.json",
    JSON.stringify(preferencije, null, 2)
  );
  res.status(200).json({ poruka: "Uspjesno poslani IDijevi" });
});

app.post("/marketing/nekretnina/:id", (req, res) => {
  try {
    const id = req.params.id;
    const trenutnePreferencije = fs.readFileSync(
      "data/preferencije.json",
      "utf-8"
    );
    let preferencije = JSON.parse(trenutnePreferencije);

    const index = preferencije.findIndex((element) => element.id === id);
    if (index !== -1) {
      preferencije[index].klikovi += 1;
    } else {
      preferencije.push({
        id: parseInt(idNekretnine),
        pretrage: 1,
        klikovi: 1,
      });
    }

    fs.writeFileSync(
      "data/preferencije.json",
      JSON.stringify(preferencije, null, 2)
    );
    res.status(200).json({ poruka: "Zahtjev uspješno poslan" });
  } catch (error) {
    console.error("Error in /marketing/nekretnina/:id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/marketing/osvjezi", (req, res) => {
  try {
    const { nizNekretnina } = req.body;

    if (nizNekretnina) {
      const trenutnePreferencije = fs.readFileSync(
        "data/preferencije.json",
        "utf-8"
      );
      let preferencije = JSON.parse(trenutnePreferencije);

      const promijenjeneNekretnine = preferencije.filter((nekretnina) =>
        nizNekretnina.includes(nekretnina.id)
      );

      if (
        JSON.stringify(promijenjeneNekretnine) !== JSON.stringify(preferencije)
      ) {
        promijenjeneNekretnine.forEach((nekretnina) => {
          const index = preferencije.findIndex(
            (element) => element.id === nekretnina.id
          );
          if (index !== -1) {
            preferencije[index].pretrage += 1;
          }
        });

        fs.writeFileSync(
          "data/preferencije.json",
          JSON.stringify(preferencije, null, 2)
        );

        res.status(200).json({ nizNekretnina: promijenjeneNekretnine });
      } else {
        res.status(200).json({});
      }
    } else {
      res.status(400).json({ error: "Neispravno tijelo zahtjeva" });
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

app.listen(3000, () => {
  console.log("Uspješno otvaranje porta 3000");
});
