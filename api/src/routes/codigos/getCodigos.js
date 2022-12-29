const { Router } = require('express');
const router = Router();
const { Codigo } = require('../../db.js');

router.get('/codigos', async (req, res)=>{
  try {
    const codigos = await Codigo.findAll();
    res.status(200).send(codigos);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;