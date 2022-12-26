const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const crearTitular = require('./crearTitular.js');
const crearParticipante = require('./crearParticipante.js');
const crearAfiliado = require('./crearAfiliado.js');
const getAfiliados = require('./getAfiliados.js');
const updateTitular = require('./updateTitular.js')
const getParticipantes = require('./getParticipantes.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(getAfiliados);
router.use(crearTitular);
router.use(crearParticipante);
router.use(crearAfiliado);
router.use(updateTitular);
router.use(getParticipantes);

module.exports = router;
