const { Router } = require('express');
const router = Router();
const { Titular } = require('../db.js');

router.post('/afiliado/crear', async (req, res)=>{

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

  // {
  //    dni: '',
  //    apellidos: '',
  //    nombres: '',
  //    participantes: [{},{}]
  // }

  // let arrayPromises = data.participantes.map( participante => new Promise( (resolve, reject) => {
  //   titular.createParticipante(participante)
  //   .then(res=>resolve(res))
  //   .catch(err=>reject(err));
  // }));
  // let resultado = await Promise.all(arrayPromises);