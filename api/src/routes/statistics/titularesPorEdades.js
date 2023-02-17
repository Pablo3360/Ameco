const { Router } = require('express');
const moment = require('moment');
const router = Router();
const { Op } = require("sequelize");
const { Titular } = require('../../db.js');

router.get('/statistics/titularesPorEdades', async (req, res)=>{

  const intervalos = {
    yearOld18: moment().subtract(18, 'years').format('YYYY-MM-DD'),
    yearOld25: moment().subtract(25, 'years').format('YYYY-MM-DD'),
    yearOld40: moment().subtract(40, 'years').format('YYYY-MM-DD'),
    yearOld65: moment().subtract(65, 'years').format('YYYY-MM-DD'),
  }

  try {
    const yearOld1825 = await Titular.count({
      where: {
        nacimiento: {
          [Op.between]: [intervalos.yearOld25, intervalos.yearOld18],
        },
      }
    });

    const yearOld2540 = await Titular.count({
      where: {
        nacimiento: {
          [Op.between]: [intervalos.yearOld40, intervalos.yearOld25],
        },
      }
    });

    const yearOld4065 = await Titular.count({
      where: {
        nacimiento: {
          [Op.between]: [intervalos.yearOld65, intervalos.yearOld40],
        },
      }
    });

    const yearOld65plus = await Titular.count({
      where: {
        nacimiento: {
          [Op.lt]: intervalos.yearOld65,
        },
      }
    });

    const respuesta = {
      '18and25': yearOld1825,
      '25and40': yearOld2540,
      '40and65': yearOld4065,
      '65plus': yearOld65plus,
    };
    res.status(200).send(respuesta);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;