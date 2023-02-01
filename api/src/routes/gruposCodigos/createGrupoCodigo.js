const { Router } = require('express');
const router = Router();
const { GrupoCodigo } = require('../../db.js');

router.post('/grupoCodigo/create/:beneficioId', async (req, res)=>{
  const createFields = req.body;
  const { beneficioId } = req.params;
  try {
    const grupoCodigo = await GrupoCodigo.create(createFields);
    await grupoCodigo.setBeneficio(beneficioId);
    res.status(200).send(grupoCodigo);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
