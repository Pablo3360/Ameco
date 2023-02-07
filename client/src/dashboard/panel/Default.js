import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import StatisticsTitularesPie from './StatisticsTitularesPie';
import Deposits from './Deposits';
import Orders from './Orders';

import { getTitularesPorSexo } from '../../actions/statisticsTitulares';

const datos = [
  {
    "id": "Varones",
    "label": "Varones",
    "value": 570,
    "color": "hsl(353, 70%, 50%)"
  },
  {
    "id": "Mujeres",
    "label": "Mujeres",
    "value": 441,
    "color": "hsl(104, 70%, 50%)"
  },
  {
    "id": "No especifica",
    "label": "No especifica",
    "value": 300,
    "color": "hsl(1, 70%, 50%)"
  },
]

function PanelContent() {

  const dispatch = useDispatch();
  const titularesPorSexo = useSelector( state => state.titularesPorSexo );
  const [dataTitularesPorSexo, setDataTitularesPorSexo] = useState(null);

  useEffect(() => {
    if(!Object.keys(titularesPorSexo).length) dispatch(getTitularesPorSexo());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
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
  }, [titularesPorSexo]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
            { dataTitularesPorSexo 
              ? <StatisticsTitularesPie data={ dataTitularesPorSexo } />
              : 'Cargando'
            }
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
            <StatisticsTitularesPie data={ datos } />
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

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function Panel() {
  return <PanelContent />;
}
