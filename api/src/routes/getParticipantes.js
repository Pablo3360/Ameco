const { Router } = require('express');
const router = Router();
const { Participante } = require('../db.js');

router.get('/participantes/:titularId', async (req, res)=>{

  const { titularId }= req.params;

  try {
    const participantes = await Participante.findAll({
      where: { titularId}
    });
    res.status(200).send(participantes);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;