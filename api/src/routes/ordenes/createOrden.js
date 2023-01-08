const { Router } = require('express');
const router = Router();
const { Orden } = require('../../db.js');

router.post('/orden/create', async (req, res)=>{
  const dataNewOrden = req.body;

  try {
    const orden = await Orden.create({
      dataTitular: dataNewOrden.titular,
      dataBeneficiario: dataNewOrden.beneficiario,
      dataBeneficio: dataNewOrden.beneficio,
      dataGrupoCodigo: dataNewOrden.grupoCodigo,
      dataCodigos: dataNewOrden.codigos,
      dataPrestador: dataNewOrden.prestador,
      dataMontos: dataNewOrden.montos,
      dataEmisor: { apellidos: 'Gomez', nombres: 'Pablo'},
      descripcion: dataNewOrden.descripcion
    });
    await orden.setTitular(dataNewOrden.titular.id);
    res.status(200).send(orden);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
