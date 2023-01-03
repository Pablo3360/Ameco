const { Router } = require('express');
const router = Router();
const { Prestador, Beneficio } = require('../../db.js');

router.get('/prestadores', async (req, res)=>{

  // Busca los prestadores de un beneficio en especifico
  const { beneficioId } = req.query;
  let WhereBeneficioId = {};
  if(beneficioId){
    Where = { where: { beneficioId: parseInt(beneficioId) } };
  };

  try {
    const prestadores = await Prestador.findAll({
      ...WhereBeneficioId,
      include: {
        model: Beneficio,
        attributes: ['id', 'nombre'],
        through: {
          attributes: { exclude: ['beneficioId', 'prestadorId'] }
        }
      },
      order: [['razon', 'ASC']]
    });
    res.status(200).send(prestadores);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;