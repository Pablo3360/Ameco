const { Router } = require('express');
const router = Router();
const { Empleador } = require('../../db.js');

router.get('/empleadores', async (req, res)=>{
  try {
    const empleadores = await Empleador.findAll({
      include: 'recaudador'
    });
    res.status(200).send(empleadores);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;