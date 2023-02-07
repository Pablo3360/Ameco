import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { getTitular } from '../../../actions/titulares';
import { createOrden, ordenResponse } from '../../../actions/ordenes';

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
      return <Cobertura  data={data} setData={setData} />;
    default:
      throw new Error('Unknown step');
  }
}

const initialData = {
  titular: {},
  beneficiario: {},
  beneficio: {},
  prestador: {},
  grupoCodigo: {},
  codigos: {
    codigos: [],
    entrega: null //Para indicar el numero de entrega del PMI: panales o leche
  },
  montos: {
    subTotal: 0,
    cobertura: 1,
    total: 0,
  }
};

export default function NuevaOrden() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const titular = useSelector( state => state.titular );
  const createdOrden = useSelector( state => state.createdOrden );
  
  const [searchParams] = useSearchParams();
  const titularId = searchParams.get('titularId');
  const beneficiarioId = searchParams.get('beneficiarioId');
  
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(initialData);//Estado que almacena la informacion en cada step para la orden
  
  const [openDialog, setOpenDialog] = useState(false);
  const [creando, setCreando] = useState(false);

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        Object.keys(data.beneficio).length === 0 ? alert('Seleccione un Beneficio') : setActiveStep(activeStep + 1);
        break;
      case 1:
        Object.keys(data.prestador).length === 0 ? alert('Seleccione un Prestador') : setActiveStep(activeStep + 1);
        break;
      case 2:
        !data.codigos.codigos.length ? alert('Seleccione almenos un Codigo') : setActiveStep(activeStep + 1);
        break;
      case 3:
        data.codigos.codigos.filter( codigo => codigo.cantidad? false : true ).length ? 
          alert('Indicar cantidad de Codigos') : setActiveStep(activeStep + 1);
        break;
      case 4:
        setOpenDialog(true);
        break;
      default:
        break;
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
      const beneficiario = titular.participantes?.find( participante => participante.id === parseInt(beneficiarioId) ) || {};
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

  useEffect(() => {
    return () => dispatch(ordenResponse({}));
    // eslint-disable-next-line
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ width: '100%' }} >

        <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
          <Typography variant="h5" component="h5" >
            Nueva Orden
          </Typography>

          { Object.keys(data.titular).length === 0 ? '' :
              <Box>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography variant="h6">
                      <strong>Titular:</strong> {data.titular.apellidos}, {titular.nombres}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      <strong>Beneficiario:</strong> {data.beneficiario?.apellidos}, {data.beneficiario?.nombres}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
          }

          <Button variant="contained"
            onClick={() => navigate(-1)}
            >
            Volver
          </Button>
        </Box>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? 
              ( <></> )
            : 
            (<>
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

            </>)
          }
        </Paper>
      </Box>

      <Dialog open={openDialog} onClose={ () => setOpenDialog(false) } >
        { Object.keys(createdOrden).length === 0 ?
          <>
            <DialogTitle> Confirmar </DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Desea emitir la Orden?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={ () => setOpenDialog(false) }>Cancelar</Button>
              <Button
                onClick={ () => {
                  setCreando(true);
                  dispatch(createOrden(data));
                }
                }
                disabled={creando ? true : false }
                autoFocus
                > 
                Confirmar
              </Button>
            </DialogActions>
          </>
            :
          <>
            <DialogTitle> Orden Generada </DialogTitle>
            <DialogContent>
              <DialogContentText>
                { `Orden N° ${createdOrden.id}` } 
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={ () => navigate('/panel/beneficios/ordenes') }>Ordenes</Button>
              <Button onClick={ () => navigate(`/panel/beneficios/ordenes/orden/${createdOrden.id}`) } autoFocus> Ver Orden </Button>
            </DialogActions>
          </>
        }
      </Dialog>

    </Box>
  );
}