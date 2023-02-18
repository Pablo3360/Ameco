const { Router } = require('express');
const router = Router();
const { Titular, Empleador } = require('../../db.js');
const { Op } = require("sequelize");

router.get('/titulares', async (req, res)=>{
  const { deleted } = req.query;
  let Where = {};
  let paranoid = {};
  if(deleted && deleted === 'true') {
    Where = { deletedAt : { [Op.not]: null }};
    paranoid = false;
  }

  try {
    const titulares = await Titular.findAll({
      where: Where,
      include: {
        model: Empleador,
        attributes: ['id', 'razon']
      },
      paranoid: paranoid,
      order: [['apellidos', 'ASC']]
    });
    res.status(200).send(titulares);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;