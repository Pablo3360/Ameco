const { Router } = require('express');
const router = Router();
const { Participante } = require('../db.js');

router.put('/participante/update/:participanteId', async (req, res)=>{
  const updateFields = req.body;
  delete updateFields.dni; //No es posible actualizar el DNI
  const { participanteId } = req.params;
  try {
    await Participante.update( updateFields, {
      where: {
        id: participanteId
      }
    });
    const participante = await Participante.findByPk(participanteId)
    res.status(200).send(participante);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
