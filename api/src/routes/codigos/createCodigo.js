const { Router } = require('express');
const router = Router();
const { Codigo } = require('../../db.js');

router.post('/codigo/create/:grupoCodigoId', async (req, res)=>{
  const createFields = req.body;
  // createFields contiene grupoCodigoId. Se setea en el metodo create y no en setGrupoCodigo
  // susede que, grupoCodigo <-> codigo forman una clave unida, que se verifica en la base de datos
  // si se crea en la misma instancia. No se verifica si se creta el registro y despues se setea en una instancia separada.
  const { grupoCodigoId } = req.params;
  console.log(createFields, grupoCodigoId);
  try {
    const codigo = await Codigo.create(createFields);
    await codigo.setGrupoCodigo(grupoCodigoId);
    res.status(200).send(codigo);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
