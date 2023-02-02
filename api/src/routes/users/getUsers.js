const { Router } = require('express');
const router = Router();
const { User } = require('../../db.js');

router.get('/users', async (req, res)=>{
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;