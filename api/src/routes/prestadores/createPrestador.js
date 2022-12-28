const { Router } = require('express');
const router = Router();
const { Prestador } = require('../../db.js');

router.post('/prestador/create', async (req, res)=>{
  const createFields = req.body;
  try {
    const prestador = await Prestador.create(createFields);
    res.status(200).send(prestador);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
