const { Router } = require('express');
const router = Router();
const { Orden } = require('../../db.js');

router.post('/orden/create/:titularId', async (req, res)=>{
  const createFields = req.body;
  const { titularId } = req.params;
  try {
    const orden = await Orden.create(createFields);
    await orden.setBeneficio(titularId);
    res.status(200).send(orden);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
