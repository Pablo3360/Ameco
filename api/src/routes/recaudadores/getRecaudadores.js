const { Router } = require('express');
const router = Router();
const { Recaudador } = require('../../db.js');

router.get('/recaudadores', async (req, res)=>{
  try {
    const recaudadores = await Recaudador.findAll();
    res.status(200).send(recaudadores);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = router;