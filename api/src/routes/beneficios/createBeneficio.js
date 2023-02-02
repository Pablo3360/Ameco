const { Router } = require('express');
const router = Router();
const { Beneficio } = require('../../db.js');

router.post('/beneficio/create', async (req, res)=>{
  const createFields = req.body;
  try {
    const beneficio = await Beneficio.create(createFields);
    res.status(200).send(beneficio);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
