const { Router } = require('express');
const { Titular, Participante } = require('../../db.js');
const router = Router();

router.delete('/titular/delete/:userId', async (req, res)=>{
  const { userId } = req.params;
  try {
    const respuesta = await Titular.destroy({
      where: {
        id: userId
      }
    });
    const r = await Participante.destroy({
      where: {
        titularId: userId
      }
    });

    res.status(200).send({isDeleted: respuesta});
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;