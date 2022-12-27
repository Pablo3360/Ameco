const { Router } = require('express');
const router = Router();
const { Titular } = require('../../db.js');

router.post('/titular/create', async (req, res)=>{
  const data = req.body;
  console.log(data);
  try {
    const titular = await Titular.create(data);
    res.status(200).send(titular);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
