const { Router } = require('express');
const router = Router();
const { Codigo } = require('../../db.js');
const { Sequelize } = require('sequelize');


router.get('/gruposcodigos', async (req, res)=>{
  try {
    const codigos = await Codigo.findAll({
      attributes:[[Sequelize.literal('DISTINCT grupo'), 'grupo']]
    });
    res.status(200).send(codigos);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;