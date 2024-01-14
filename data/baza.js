const Sequelize =require('sequelize');

const sequelizeDB=new Sequelize("wt24","root", "",
{
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false

});

const db={};

db.Sequelize=Sequelize;
db.sequelize=sequelizeDB;

db.korisnik=require('./Korisnik.js')(sequelizeDB);
db.nekretnina=require('./Nekretnina.js')(sequelizeDB);
db.upit=require('./Upit.js')(sequelizeDB);

db.korisnik.hasMany(db.upit, { as: 'upiti', foreignKey: 'korisnikId' });
db.upit.belongsTo(db.korisnik, { foreignKey: 'korisnikId' });

db.nekretnina.hasMany(db.upit, { as: 'upiti', foreignKey: 'nekretninaId' });
db.upit.belongsTo(db.nekretnina, { foreignKey: 'nekretninaId' });

module.exports=db;
