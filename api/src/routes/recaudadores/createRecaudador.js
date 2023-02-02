const { Router } = require('express');
const router = Router();
const { Recaudador } = require('../../db.js');

router.post('/recaudador/create', async (req, res)=>{
  const createFields = req.body;
  try {
    const recaudador = await Recaudador.create(createFields);
    res.status(200).send(recaudador);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;
