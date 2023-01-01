const { Router } = require('express');
const router = Router();
const { GrupoCodigo } = require('../../db.js');

router.get('/gruposCodigos', async (req, res)=>{
  try {
    const grupoCodigo = await GrupoCodigo.findAll({
      order: [['nombre', 'ASC']]
    });
    res.status(200).send(grupoCodigo);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;