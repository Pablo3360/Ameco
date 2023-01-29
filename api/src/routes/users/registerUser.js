const { Router } = require('express');
const router = Router();
const { User } = require('../../db.js');
const bcrypt = require('bcrypt');

router.post('/registerUser', async (req, res)=>{
  const { apellidos, nombres, mail, password, permisos } = req.body;

  if( !apellidos || !nombres || !mail || !password || !permisos){
    return res.status(400).send('Faltan datos');
  }

  try {
    const saltRaunds = 10;
    const passwordHash = await bcrypt.hash(password, saltRaunds);
    const userCreated = await User.create({
      apellidos,
      nombres,
      mail,
      passwordHash: passwordHash,
      permisos,
    });
    return res.status(200).send(userCreated);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;