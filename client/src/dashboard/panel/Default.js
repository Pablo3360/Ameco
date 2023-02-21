import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TitularesEnNumeros from '../afiliados/estadisticas/TitularesEnNumeros';

function PanelContent() {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={6} lg={6}>
          <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                //height: 260,
              }}
            >
              <TitularesEnNumeros />
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

export default function Panel() {
  return <PanelContent />;
}