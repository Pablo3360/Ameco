const { Router } = require('express');
const router = Router();
const { Titular, Participante } = require('../../db.js');

router.get('/titular/:titularId', async (req, res)=>{
  const { titularId } = req.params;
  try {
    const titular = await Titular.findByPk( titularId, { 
      include: Participante
    });
    res.status(200).send(titular);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;