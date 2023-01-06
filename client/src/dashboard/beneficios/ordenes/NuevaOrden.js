import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Beneficio from './step/Beneficio';
import Prestador from './step/Prestador';
import Codigos from './step/Codigos';
import Cantidad from './step/Cantidad';
import Cobertura from './step/Cobertura';
import { useDispatch, useSelector } from 'react-redux';

import { getTitular } from '../../../actions/titulares.js';

const steps = ['Beneficio', 'Prestador', 'Codigos', 'Cantidad', 'Cobertura AMECO'];

function getStepContent(step, data, setData) {
  
  switch (step) {
    case 0:
      return <Beneficio data={data} setData={setData} />;
    case 1:
      return <Prestador data={data} setData={setData} />;
    case 2:
      return <Codigos  data={data} setData={setData} />;
    case 3:
      return <Cantidad  data={data} setData={setData} />;
    case 4:
      return <Cobertura  data={data} />;
    default:
      throw new Error('Unknown step');
  }
}

const initialData = {
  titular: {},
  beneficiario: {},
  beneficio: {},
  prestador: {},
  grupoCodigo: '',
  codigos: [],
}

export default function NuevaOrden() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const titular = useSelector( state => state.titular );

  const [searchParams] = useSearchParams();
  const titularId = searchParams.get('titularId');
  const beneficiarioId = searchParams.get('beneficiarioId');
  console.log(titularId, beneficiarioId);

  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(initialData);//Estado que almacena la informacion en cada step para la orden

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        data.beneficio === '' ? alert('Seleccione un Beneficio'): setActiveStep(activeStep + 1);
        break;
      case 1:
        data.prestador === '' ? alert('Seleccione un Prestador'): setActiveStep(activeStep + 1);
        break;
      case 2:
        !data.codigos.length ? alert('Seleccione almenos un Codigo') : setActiveStep(activeStep + 1);
        break;
      case 3:
        data.codigos.filter( codigo => codigo.cantidad? false : true ).length ? 
          alert('Indicar cantidad de Codigos') : setActiveStep(activeStep + 1);
        break;
      default:
        setActiveStep(activeStep + 1);
    }
    
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  useEffect(() => {
    dispatch(getTitular(titularId));
    // eslint-disable-next-line
  }, [titularId]);

  useEffect(() => {
    if ( beneficiarioId ){
      const beneficiario = titular.partitipantes.find( participante => participante.id === beneficiarioId );
      const titularCopy = { ...titular };
      delete titularCopy.participantes;
      setData( data => ( { ...data, titular: titularCopy, beneficiario: beneficiario } ));
    } else{
      const titularCopy = { ...titular };
      delete titularCopy.participantes;
      setData( data => ( { ...data, titular: titularCopy, beneficiario: titularCopy } ));
    }
    // eslint-disable-next-line 
  }, [titular]);

  return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ width: '100%' }} >

          <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between'}} >
            <Typography variant="h5" component="h5" >
              Nueva Orden
            </Typography>
            <Button variant="contained"
              onClick={() => navigate(-1)}
              >
              Volver
            </Button>
          </Box>

          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>

            <Box sx={{ mb:2, display: 'flex', justifyContent: 'flex-end'}} >
              <Typography variant="h5" component="h5" >
                Titular: {data.titular.apellidos}, {titular.nombres}
              </Typography>

              <Typography variant="h5" component="h5" >
                Beneficiario: {data.beneficiario.apellidos}, {data.beneficiario.nombres}
              </Typography>
            </Box>

            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep, data, setData)}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Atras
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Emitir Orden' : 'Siguiente'}
                  </Button>
                </Box>

              </>
            )}
          </Paper>

        </Box>
      </Box>
  );
}