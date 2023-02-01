const { Sequelize } = require('sequelize');
const participantes = require('./leerParticipantesJson.js')
const ParticipanteFn = require('../../models/Participante.js');

const user = "postgres";
const pass = "964";
const dbname = "ameco";

const database  = new Sequelize(`postgres://${user}:${pass}@localhost:5432/${dbname}`, {
    logging:false,
    native: false
});

ParticipanteFn(database);

const { participante }  = database.models;

//aca las relaciones de los modelos

async function Start () {
    try {
        await database.sync({ force: true }).then(console.log('Sincronizado a la DB'));
        await participante.bulkCreate(participantes());
        return console.log('Grabado Participantes en DB');
    } catch (error) {
        return console.log(error.message);
    }
}

Start();



