const { Router } = require('express');
const router = Router();
const { Recaudador } = require('../../db.js');

router.put('/recaudador/update/:recaudadorId', async (req, res)=>{
  const updateFields = req.body;
  delete updateFields.dni; //No es posible actualizar el DNI
  const { recaudadorId } = req.params;
  try {
    await Recaudador.update( updateFields, {
      where: {
        id: recaudadorId
      }
    });
    const recaudador = await Recaudador.findByPk(recaudadorId)
    res.status(200).send(recaudador);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
