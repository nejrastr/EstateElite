const Sequelize=require('sequelize');
const sequelize = require('./baza');

module.exports=function(sequelize,DataTypes){
    const upit=sequelize.define("upit",{
        tekst_upita:Sequelize.STRING,
    });

    return upit;
}

