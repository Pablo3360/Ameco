import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Valor Orden', detail: '3800' },
  { name: 'Beneficio AMECO 50%', detail: '-1900' },
  { name: 'Total a Abonar', detail: '1900' },
];

export default function VerificarOrden({ data }) {

  const codigos = data.codigos;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Detalles de la Orden
      </Typography>

      <List disablePadding>

        {codigos.map((codigo) => (
          <ListItem key={codigo.id} sx={{ py: 1, px: 0 }} divider={true}>
            <ListItemText primary={codigo.nombre} secondary={`Codigo: ${codigo.codigo}`} />
            <ListItemText primary={codigo.cantidad}  />
            <Typography variant="body2">$ 950</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Sub Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ 3800
          </Typography>
        </ListItem>

      </List>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Prestador
          </Typography>

          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>

        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalles de Pago
          </Typography>

          <Box sx={{ justifyContent: 'space-between' }}>
            <List disablePadding >

              <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
                <ListItemText primary="Sub Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  $ 3800
                </Typography>
              </ListItem>

              <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
                <ListItemText primary="Beneficio AMECO" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  - $ 1800
                </Typography>
              </ListItem>

              <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} >
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  $ 1800
                </Typography>
              </ListItem>

            </List>
          </Box>

            {/*
              <Grid item xs={6}>
                <Typography gutterBottom>{payment.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{payment.detail}</Typography>
              </Grid>
            */}
        
        </Grid>

      </Grid>

    </>
  );
}