import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function SuccessCreatedOrden( { createdOrden }) {

  if(Object.keys(createdOrden).length !== 0){
    return (
      <Grid container spacing={2} >

        <Grid item xs={12} sm={12}>
          <Box sx={{ mb:2, display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            <Typography variant='h5'>
              ¡Orden Generada con Exito!
            </Typography>
          </Box>
        </Grid>
  
        <Grid item xs={12} sm={6}>
          <List disablePadding >
            <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
              <ListItemText primary="Titular: " />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {createdOrden.dataTitular.apellidos}, {createdOrden.dataTitular.nombres}
              </Typography>
            </ListItem>
            <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
              <ListItemText primary="Beneficiario: " />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {createdOrden.dataBeneficiario.apellidos}, {createdOrden.dataBeneficiario.nombres}
              </Typography>
            </ListItem>
            <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
              <ListItemText primary="Beneficio: " />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {createdOrden.dataBeneficio.nombre}
              </Typography>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
            <ListItemText primary="Orden Número: " />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {createdOrden.id}
            </Typography>
          </ListItem>
          <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
            <ListItemText primary="Fecha: " />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {createdOrden.createdAt}
            </Typography>
          </ListItem>
          <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
            <ListItemText primary="Prestador " />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {createdOrden.dataPrestador.razon}
            </Typography>
          </ListItem>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Box sx={{ mb:2, display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            <Button
              variant="contained"
              onClick={()=> alert('Se abre pdf')}
              sx={{ mt: 3, ml: 1 }}
              >
              Ver Orden
            </Button>
          </Box>
        </Grid>

      </Grid>
    )
  } else {
    return (
      <Grid item xs={12} sm={12}>
        <Box sx={{ mb:2, display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
          <Typography variant='h5'>
            Cargando...
          </Typography>
        </Box>
    </Grid>
    );
  }
}