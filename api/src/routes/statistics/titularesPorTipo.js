const { Router } = require('express');
const router = Router();
const { Titular } = require('../../db.js');

router.get('/statistics/titularesPorTipo', async (req, res)=>{
  try {
    const titularesActivos = await Titular.count({
      where: {
        tipo: 'activo',
      }
    });
    const titularesAdherentes = await Titular.count({
      where: {
        tipo: 'adherente',
      }
    });
    const respuesta = {
      activos: titularesActivos,
      adherentes: titularesAdherentes,
    };
    res.status(200).send(respuesta);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;