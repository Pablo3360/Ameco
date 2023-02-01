const { Router } = require('express');
const router = Router();
const { Empleador } = require('../../db.js');

router.post('/empleador/create/:recaudadorId', async (req, res)=>{
  const createFields = req.body;
  const { recaudadorId } = req.params;
  try {
    const empleador = await Empleador.create(createFields);
    await empleador.setRecaudador(recaudadorId);
    res.status(200).send(empleador);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
