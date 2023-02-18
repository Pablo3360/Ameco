const { Router } = require('express');
const { Titular } = require('../../db.js');
const router = Router();

router.put('/titular/restore/:userId', async (req, res)=>{
  const { userId } = req.params;
  try {
    const respuesta = await Titular.restore({
      where: {
        id: userId
      }
    });
    console.log(respuesta);
    res.status(200).send({isRestored: respuesta});
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;