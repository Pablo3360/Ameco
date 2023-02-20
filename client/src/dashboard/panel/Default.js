import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function PanelContent() {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>

        <Grid item xs={6}>
          
        </Grid>

      </Grid>
    </Container>
  );
}

export default function Panel() {
  return <PanelContent />;
}