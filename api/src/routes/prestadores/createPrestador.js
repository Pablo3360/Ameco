const { Router } = require('express');
const router = Router();
const { Prestador } = require('../../db.js');

router.post('/prestador/create/:beneficioId', async (req, res)=>{
  const createFields = req.body;
  const { beneficioId } = req.params;
  try {
    const prestador = await Prestador.create(createFields);
    await prestador.setBeneficio(beneficioId);
    res.status(200).send(prestador);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
