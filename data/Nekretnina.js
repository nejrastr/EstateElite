const Sequelize=require('sequelize');
const sequelize=require('./baza.js');

module.exports=function(sequelize,DataTypes){
    const nekretnina=sequelize.define("nekretnina",{
        tip_nekretnine:Sequelize.STRING,
        naziv:Sequelize.STRING,
        kvadratura:Sequelize.INTEGER,
        cijena:Sequelize.INTEGER,
        tip_grijanja: Sequelize.STRING,
        lokacija:Sequelize.STRING,
        godina_izgradnje:Sequelize.INTEGER,
        datum_objave:Sequelize.STRING,
        opis:Sequelize.STRING,

    });

    return nekretnina;
}