const { Router } = require('express');
const router = Router();
const { Prestador, Beneficio } = require('../../db.js');

router.get('/prestadores/:beneficioId', async (req, res)=>{
  const { beneficioId } = req.params;
  try {
    const beneficio = await Beneficio.findByPk(beneficioId);
    const prestadores = await beneficio.getPrestadors({ joinTableAttributes: [] });
    res.status(200).send(prestadores);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;