const { Router } = require('express');
const router = Router();
const { Participante } = require('../db.js');

router.post('/participante/crear/:titularId', async (req, res)=>{

  const fields = req.body;
  const { titularId } = req.params;

  delete fields.id;
  delete fields.isNew;

  console.log(fields, titularId);

  try {
    const participante = await Participante.create(fields);
    await participante.setTitular(titularId);
    res.status(200).send(participante);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;
