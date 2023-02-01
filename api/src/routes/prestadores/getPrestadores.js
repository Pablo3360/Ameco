const { Router } = require('express');
const router = Router();
const { Prestador, Beneficio } = require('../../db.js');

router.get('/prestadores', async (req, res)=>{

  try {
    const prestadores = await Prestador.findAll({
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