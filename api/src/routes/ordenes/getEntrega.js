const { json } = require('body-parser');
const { Router } = require('express');
const router = Router();
const { Orden } = require('../../db.js');

router.get('/ordenes/entrega', async (req, res)=>{
  const { titularId, beneficiarioId, grupoCodigoId } = req.query;
  console.log(titularId, beneficiarioId, grupoCodigoId);
  try {
    const ordenes = await Orden.findAll({
      raw: true,
      where: {
        titularId: titularId,
        dataBeneficiario: {
          id: beneficiarioId
        },
        dataGrupoCodigo: {
          id: grupoCodigoId
        }
      },
      order: [['createdAt', 'ASC']], 
    });

    if(ordenes.length){
      const dataUltimaEntrega = ordenes.pop();
      const numeroUltimaEntrega = dataUltimaEntrega.dataCodigos[0].entrega;
      if(numeroUltimaEntrega) { // Corroboramos que no sea undefined
        return res.status(200).send({ entrega: numeroUltimaEntrega });
      }
    }
    return res.status(200).send({ entrega: 0 });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = router;