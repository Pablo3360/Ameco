const { Router } = require('express');
const router = Router();
const { Beneficio } = require('../../db.js');

router.put('/beneficio/update/:beneficioId', async (req, res)=>{
  const updateFields = req.body;
  delete updateFields.codigo_unico; //No es posible actualizar el Codigo Unico de uso exclusito en AMECO
  const { beneficioId } = req.params;
  try {
    await Beneficio.update( updateFields, {
      where: {
        id: beneficioId
      }
    });
    const beneficio = await Beneficio.findByPk(beneficioId)
    res.status(200).send(beneficio);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
