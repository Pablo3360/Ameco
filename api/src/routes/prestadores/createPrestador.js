const { Router } = require('express');
const router = Router();
const { Prestador, Beneficio } = require('../../db.js');

router.post('/prestador/create', async (req, res)=>{
  const createFields = req.body;
  const { beneficiosId } = createFields;
  delete createFields.beneficiosId;
  try {
    const prestador = await Prestador.create(createFields);
    await prestador.setBeneficios(beneficiosId);
    const prestadorResponse = await Prestador.findByPk(prestador.id, {
      include: {
        model: Beneficio,
        attributes: ['id', 'nombre'],
        through: {
          attributes: { exclude: ['beneficioId', 'prestadorId'] }
        }
      }
    });
    res.status(200).send(prestadorResponse);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
