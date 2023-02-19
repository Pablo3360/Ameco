const { Router } = require('express');
const moment = require('moment');
const router = Router();
const { Op } = require("sequelize");
const { Orden } = require('../../db.js');

router.get('/ordenes/panales', async (req, res)=>{
  //const fecha = moment().subtract(1, 'month').format('DD-MM-YYYY');
  try {
    const ordenes = await Orden.findAll({
      where: {
        dataGrupoCodigo: {
          id: 2
        },
      },
      order: [['createdAt', 'DESC']],
      limit: 20,
    });
    res.status(200).send(ordenes);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;