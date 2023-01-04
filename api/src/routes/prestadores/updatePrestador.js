const { Router } = require('express');
const router = Router();
const { Prestador, Beneficio } = require('../../db.js');

router.put('/prestador/update/:prestadorId', async (req, res)=>{
  const updateFields = req.body;
  console.log(updateFields);
  delete updateFields.razon; //No es posible actualizar la Razon
  delete updateFields.cuit; //No es posible actualizar el CUIT
  // delete updateFields.beneficiosId; //No es posible actualizar/cambiar los beneficios de un prestador
  const { prestadorId } = req.params;
  try {
    // Actualiza los campos de la tabla prestadors
    await Prestador.update( updateFields, {
      where: {
        id: prestadorId
      }
    });
    // Busca un prestador y setea sus beneficios
    const prestador = await Prestador.findByPk(prestadorId);
    await prestador.setBeneficios(updateFields.beneficiosId);
    // busca un prestador con los campos especificados
    const prestadorResponse = await Prestador.findByPk(prestadorId, {
      include: {
        model: Beneficio,
        attributes: ['id', 'nombre'],
        through: {
          attributes: { exclude: ['beneficioId', 'prestadorId'] }
        }
      }
    });
    // Responde y envia el prestador actualizado
    res.status(200).send(prestadorResponse);

  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;
