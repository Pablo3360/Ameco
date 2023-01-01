const { Router } = require('express');
const router = Router();
const { Codigo } = require('../../db.js');

router.get('/codigos', async (req, res)=>{

  const { grupoCodigoId } = req.query;
  let Where = {};
  if(grupoCodigoId){
    Where = { where: { grupoCodigoId: parseInt(grupoCodigoId) } };
  }
  try {
    const codigos = await Codigo.findAll({
      ...Where,
      order: [['nombre', 'ASC']]
    });
    res.status(200).send(codigos);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;