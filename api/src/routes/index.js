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

const getEmpleadores = require('./empleadores/getEmpleadores.js');
const createEmpleador = require('./empleadores/createEmpleador.js');
const updateEmpleador = require('./empleadores/updateEmpleador.js');

const getPrestadores = require('./prestadores/getPrestadores.js');
const createPrestador = require('./prestadores/createPrestador.js');
const updatePrestador = require('./prestadores/updatePrestador.js');

const getBeneficios = require('./beneficios/getBeneficios.js');
const createBeneficio = require('./beneficios/createBeneficio.js');
const updateBeneficio = require('./beneficios/updateBeneficio.js');

const getGruposCodigos = require('./gruposCodigos/getGruposCodigos.js');
const createGrupoCodigo = require('./gruposCodigos/createGrupoCodigo.js');
const updateGrupoCodigo = require('./gruposCodigos/updateGrupoCodigo.js');

const getCodigos = require('./codigos/getCodigos.js');
const createCodigo = require('./codigos/createCodigo.js');
const updateCodigo = require('./codigos/updateCodigo.js');

const getOrdenes = require('./ordenes/getOrdenes.js');
const createOrden = require('./ordenes/createOrden.js');

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

router.use(getEmpleadores);
router.use(createEmpleador);
router.use(updateEmpleador);

router.use(getPrestadores);
router.use(createPrestador);
router.use(updatePrestador);

router.use(getBeneficios);
router.use(createBeneficio);
router.use(updateBeneficio);

router.use(getGruposCodigos);
router.use(createGrupoCodigo);
router.use(updateGrupoCodigo);

router.use(getCodigos);
router.use(createCodigo);
router.use(updateCodigo);

router.use(getOrdenes);
router.use(createOrden);

module.exports = router;
