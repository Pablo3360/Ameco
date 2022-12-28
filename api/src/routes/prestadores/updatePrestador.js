const { Router } = require('express');
const router = Router();
const { Prestador } = require('../../db.js');

router.put('/prestador/update/:prestadorId', async (req, res)=>{
  const updateFields = req.body;
  delete updateFields.cuit; //No es posible actualizar el CUIT
  const { prestadorId } = req.params;
  try {
    await Prestador.update( updateFields, {
      where: {
        id: prestadorId
      }
    });
    const prestador = await Prestador.findByPk(prestadorId)
    res.status(200).send(prestador);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
