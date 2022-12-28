const { Router } = require('express');
const router = Router();
const { Empleador: Prestador } = require('../../db.js');

router.get('/prestadores', async (req, res)=>{
  try {
    const prestadores = await Prestador.findAll({
      order: [['razon', 'ASC']]
    });
    res.status(200).send(prestadores);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;