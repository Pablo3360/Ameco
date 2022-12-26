const { Router } = require('express');
const router = Router();
const { Participante } = require('../db.js');

router.post('/participante/create/:titularId', async (req, res)=>{
  const createFields = req.body;
  const { titularId } = req.params;
  try {
    const participante = await Participante.create(createFields);
    await participante.setTitular(titularId);
    res.status(200).send(participante);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
