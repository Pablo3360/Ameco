import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import StatisticsTitularesSexo from './StatisticsTitularesSexo';
import Deposits from './Deposits';
import Orders from './Orders';

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
            <StatisticsTitularesSexo data={ datos } />
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
            <StatisticsTitularesSexo data={ datos } />
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
