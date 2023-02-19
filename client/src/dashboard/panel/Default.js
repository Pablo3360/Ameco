import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Orders from './Orders';

//import { getTitularesPorSexo, getTitularesPorEdades } from '../../../actions/statisticsTitulares';

function PanelContent() {

  // const dispatch = useDispatch();

  // useEffect(() => {

  //   // eslint-disable-next-line
  // }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

        {/* <Grid item xs={12} md={6} lg={5}>
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
        </Grid> */}

        {/* <Grid item xs={12} md={6} lg={5}>
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
        </Grid> */}
        
        {/* <Grid item xs={12} md={12} lg={2}>
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
        </Grid> */}

        <Grid item xs={6}>
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