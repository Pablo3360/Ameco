const { Router } = require('express');
const router = Router();
const { User } = require('../../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/singIn', async (req, res)=>{
  const { mail, password } = req.body;

  if( !mail || !password){
    return res.status(400).send({message: 'Faltan datos'});
  }

  try {
    const user = await User.findOne({
      where: {
        mail
      }
    });
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if(!passwordCorrect){
      return res.status(400).send({message: 'Mail o Constraseña incorrectos'})
    }

    const userForToken = {
      "id": user.id,
      "mail": user.mail,
      "permisos": user.permisos,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 6 });

    return res.status(200).send({
      "id": user.id,
      "apellidos": user.apellidos,
      "nombres": user.nombres,
      "mail": user.mail,
      "token": token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

module.exports = router;