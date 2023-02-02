const { Router } = require('express');
const { Titular } = require('../../db.js');
const router = Router();

router.put('/titular/update/:userId', async (req, res)=>{
  const { userId } = req.params;
  const updatedFields = req.body;
  try {
    const respuesta = await Titular.update( updatedFields, {
      where: {
        id: userId
      }
    });
    res.status(200).send(respuesta);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;