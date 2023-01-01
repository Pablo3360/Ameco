const { Router } = require('express');
const router = Router();
const { Prestador } = require('../../db.js');

router.get('/prestadores', async (req, res)=>{

  const { beneficioId } = req.query;
  let Where = {};
  if(beneficioId){
    Where = { where: { beneficioId: parseInt(beneficioId) } };
  }
  
  try {
    const prestadores = await Prestador.findAll({
      ...Where,
      order: [['razon', 'ASC']]
    });
    res.status(200).send(prestadores);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;