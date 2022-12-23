const { Sequelize } = require('sequelize');
const titulares = require('./leerTitularesJson.js')
const TitularFn = require('../../models/Titular.js');

const user = "postgres";
const pass = "964";
const dbname = "ameco";

const database  = new Sequelize(`postgres://${user}:${pass}@localhost:5432/${dbname}`, {
    logging:false,
    native: false
});

TitularFn(database);

const { titular }  = database.models;

//aca las relaciones de los modelos

async function Start () {
    try {
        await database.sync({ force: true }).then(console.log('Sincronizado a la DB'));
        await titular.bulkCreate(titulares());
        return console.log('Grabado Titulares en DB');
    } catch (error) {
        return console.log(error.message);
    }
}

Start();



