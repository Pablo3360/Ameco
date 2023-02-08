const { Router } = require('express');
const router = Router();
const { Titular } = require('../../db.js');

router.get('/statistics/titularesPorSexo', async (req, res)=>{
  try {
    const titularesVarones = await Titular.count({
      where: {
        sexo: 'varon',
      }
    });
    const titularesMujeres = await Titular.count({
      where: {
        sexo: 'mujer',
      }
    });
    const titularesSinEspecificar = await Titular.count({
      where: {
        sexo: 'sin especificar',
      }
    });
    const respuesta = {
      varones: titularesVarones,
      mujeres: titularesMujeres,
      sinEspecificar: titularesSinEspecificar,
    };
    res.status(200).send(respuesta);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;