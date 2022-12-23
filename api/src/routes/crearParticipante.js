const { Router } = require('express');
const router = Router();
const { Participante } = require('../db.js');

router.post('/afiliado/participante/crear', async (req, res)=>{
  const data = req.body;
  try {
    const participante = await Participante.create(data);
    await participante.setTitular(data.titularId);
    res.status(200).send(participante);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
