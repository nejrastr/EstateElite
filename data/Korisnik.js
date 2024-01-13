// kreiranje tabele korisnik

const Sequelize=require('sequelize');

const sequelize=require('./baza.js');

module.exports=function(sequelize, DataTypes){
    const korisnik=sequelize.define("korisnik",{
        ime:Sequelize.STRING,
        prezime:Sequelize.STRING,
        username:Sequelize.STRING,
        password:Sequelize.STRING
    }

    );
return korisnik
}
