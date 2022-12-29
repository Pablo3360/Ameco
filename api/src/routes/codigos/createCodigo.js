const { Router } = require('express');
const router = Router();
const { Codigo } = require('../../db.js');

router.post('/codigo/create/:beneficioId', async (req, res)=>{
  const createFields = req.body;
  const { beneficioId } = req.params;
  try {
    const codigo = await Codigo.create(createFields);
    await codigo.setBeneficio(beneficioId);
    res.status(200).send(codigo);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
