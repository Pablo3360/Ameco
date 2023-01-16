const { Router } = require('express');
const router = Router();
const { Orden } = require('../../db.js');

router.get('/orden/:ordenId', async (req, res)=>{
  const { ordenId } = req.params;
  try {
    const orden = await Orden.findByPk(ordenId);
    res.status(200).send(orden);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;