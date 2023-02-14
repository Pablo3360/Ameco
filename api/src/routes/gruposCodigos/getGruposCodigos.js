const { Router } = require('express');
const router = Router();
const { GrupoCodigo } = require('../../db.js');

router.get('/gruposCodigos', async (req, res)=>{

  const { beneficioId } = req.query;
  let Where = {};
  if(beneficioId){
    Where = { beneficioId: parseInt(beneficioId) } ;
  }

  try {
    const grupoCodigo = await GrupoCodigo.findAll({
      where: Where
    });
    res.status(200).send(grupoCodigo);
  } catch (error) {
    console.log(error)
    return res.status(400).send(error);
  }
});

module.exports = router;