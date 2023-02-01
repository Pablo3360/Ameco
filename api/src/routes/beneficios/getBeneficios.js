const { Router } = require('express');
const router = Router();
const { Beneficio } = require('../../db.js');

router.get('/beneficios', async (req, res)=>{
  try {
    const beneficios = await Beneficio.findAll({
      order: [['nombre', 'ASC']]
    });
    res.status(200).send(beneficios);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;