import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import StatisticsTitularesPie from '../../../components/StatisticsTitularesPie';
import Deposits from './Deposits';

import { getTitularesPorSexo, getTitularesPorEdades } from '../../../actions/statisticsTitulares';

function PanelContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const titularesPorSexo = useSelector( state => state.titularesPorSexo );
  const titularesPorEdades = useSelector( state => state.titularesPorEdades );
  const [dataTitularesPorSexo, setDataTitularesPorSexo] = useState(null);
  const [dataTitularesPorEdades, setDataTitularesPorEdades] = useState(null);

  useEffect(() => {
    if(!Object.keys(titularesPorSexo).length) dispatch(getTitularesPorSexo());
    if(!Object.keys(titularesPorEdades).length) dispatch(getTitularesPorEdades());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(Object.keys(titularesPorSexo).length) {
      setDataTitularesPorSexo([
        {
          "id": "Varones",
          "label": "Varones",
          "value": titularesPorSexo.varones,
          "color": "hsl(353, 70%, 50%)"
        },
        {
          "id": "Mujeres",
          "label": "Mujeres",
          "value": titularesPorSexo.mujeres,
          "color": "hsl(104, 70%, 50%)"
        },
        {
          "id": "Sin especificar",
          "label": "Sin especificar",
          "value": titularesPorSexo.sinEspecificar,
          "color": "hsl(1, 70%, 50%)"
        },
      ]);
    }
  }, [titularesPorSexo]);

  useEffect(() => {
    if(Object.keys(titularesPorEdades).length) {
      setDataTitularesPorEdades([
        {
          "id": "[18,25]",
          "label": "[18,25]",
          "value": titularesPorEdades['18and25'],
          "color": "hsl(353, 70%, 50%)"
        },
        {
          "id": "[25,40]",
          "label": "[25,40]",
          "value": titularesPorEdades['25and40'],
          "color": "hsl(104, 70%, 50%)"
        },
        {
          "id": "[40,65]",
          "label": "[40,65]",
          "value": titularesPorEdades['40and65'],
          "color": "hsl(104, 70%, 50%)"
        },
        {
          "id": "65+",
          "label": "65+",
          "value": titularesPorEdades['65plus'],
          "color": "hsl(104, 70%, 50%)"
        },

      ]);
    }
  }, [titularesPorEdades]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

      <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between'}} >
        
        <Typography variant="h5" component="h5" >
          Estadisticas Afiliados Titulares
        </Typography>

        <Box sx={{ mb:2, display: 'flex', justifyContent: 'flex-end'}} >

          <Button sx={{ mr:2}}
            variant="contained"
            onClick={() => navigate(-1)}
            >
            Volver
          </Button>

        </Box>
        
      </Box>

      <Grid container spacing={3}>

        <Grid item xs={12} md={6} lg={5}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
            >
            <Typography component="h6" variant="h6" color="primary" gutterBottom>
              Sexo Titulares
            </Typography>

            <Box sx={{
              height: 180,
              }}>

              { dataTitularesPorSexo
                ? <StatisticsTitularesPie data={ dataTitularesPorSexo } />
                : 'Cargando'
              }
            </Box>

          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={5}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
            >
            <Typography component="h6" variant="h6" color="primary" gutterBottom>
              Edades Titulares
            </Typography>
            <Box sx={{
              height: 180,
              }}>

              { dataTitularesPorEdades
                ? <StatisticsTitularesPie data={ dataTitularesPorEdades } />
                : 'Cargando'
              }
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={12} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

export default function Panel() {
  return <PanelContent />;
}
