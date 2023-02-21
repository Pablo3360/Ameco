const { Router } = require('express');
const moment = require('moment');
const router = Router();
const { Op } = require("sequelize");
const { Titular, Participante } = require('../../db.js');

router.get('/statistics/titularesPorTipos', async (req, res)=>{
  try {
    const titularesActivos = await Titular.count({
      where: {
        tipo: 'activo',
      },
    });
    const titularesAdherentes = await Titular.count({
      where: {
        tipo: 'adherente',
      },
    });
    const participantes = await Participante.count({
      where: {
        nacimiento: {
          [Op.gt]: moment().subtract(21, 'years').format('YYYY-MM-DD')
        },
        relacion: {
          [Op.not]: 'pareja'
        }
      }
    });
    const parejas = await Participante.count({
      where: {
        relacion: 'pareja',
      }
    });

    const respuesta = {
      activos: titularesActivos,
      adherentes: titularesAdherentes,
      participantes: participantes,
      parejas: parejas,
    };
    res.status(200).send(respuesta);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;