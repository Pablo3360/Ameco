const { Router } = require('express');
const router = Router();
const { Empleador } = require('../../db.js');

router.put('/empleador/update/:empleadorId', async (req, res)=>{
  const updateFields = req.body;
  delete updateFields.cuit; //No es posible actualizar el CUIT
  const { empleadorId } = req.params;
  try {
    await Empleador.update( updateFields, {
      where: {
        id: empleadorId
      }
    });
    const empleador = await Empleador.findByPk(empleadorId)
    res.status(200).send(empleador);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
