const { Router } = require('express');
const router = Router();
const { GrupoCodigo } = require('../../db.js');

router.put('/grupoCodigo/update/:grupoCodigoId', async (req, res)=>{
  const updateFields = req.body;
  delete updateFields.nombre; //No es posible actualizar el Nombre de un grupoCodigo
  const { grupoCodigoId } = req.params;
  try {
    await GrupoCodigo.update( updateFields, {
      where: {
        id: grupoCodigoId
      }
    });
    const grupoCodigo = await GrupoCodigo.findByPk(grupoCodigoId)
    res.status(200).send(grupoCodigo);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
