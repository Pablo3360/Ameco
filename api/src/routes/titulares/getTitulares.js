const { Router } = require('express');
const router = Router();
const { Titular } = require('../../db.js');

router.get('/titulares', async (req, res)=>{
  try {
    const titulares = await Titular.findAll({
      order: [['apellidos', 'ASC']]
    });
    res.status(200).send(titulares);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;