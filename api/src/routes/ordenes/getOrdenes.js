const { Router } = require('express');
const router = Router();
const { Orden } = require('../../db.js');

router.get('/ordenes', async (req, res)=>{
  try {
    const ordenes = await Orden.findAll({
      order: [['id', 'ASC']]
    });
    res.status(200).send(ordenes);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;