const { Router } = require('express');
const router = Router();
const { Codigo } = require('../../db.js');

router.put('/codigo/update/:codigoId', async (req, res)=>{
  const updateFields = req.body;
  delete updateFields.codigo; //No es posible actualizar el Codigo
  delete updateFields.grupoCodigoId; //No es posible actualizar el Grupo de Codigo
  delete updateFields.nombre; //No es posible actualizar el Grupo de Codigo
  const { codigoId } = req.params;
  try {
    await Codigo.update( updateFields, {
      where: {
        id: codigoId
      }
    });
    const codigo = await Codigo.findByPk(codigoId)
    res.status(200).send(codigo);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
