const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getTitulares = require('./titulares/getTitulares.js');
const createTitular = require('./titulares/createTitular.js');
const updateTitular = require('./titulares/updateTitular.js');

const getParticipantes = require('./participantes/getParticipantes.js');
const createParticipante = require('./participantes/createParticipante.js');
const updateParticipante = require('./participantes/updateParticipante.js');

const getRecaudadores = require('./recaudadores/getRecaudadores.js');
const createRecaudador = require('./recaudadores/createRecaudador.js');
const updateRecaudador = require('./recaudadores/updateRecaudador.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(getTitulares);
router.use(createTitular);
router.use(updateTitular);

router.use(getParticipantes);
router.use(createParticipante);
router.use(updateParticipante);

router.use(getRecaudadores);
router.use(createRecaudador);
router.use(updateRecaudador);

module.exports = router;
