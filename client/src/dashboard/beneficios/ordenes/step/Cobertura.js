import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Cobertura({ data, setData }) {

  const [montos, setMontos] = useState({
    subTotal: data.codigos.codigos.reduce( (subTotal, codigo) => subTotal + codigo.precio, 0 ),
    cobertura: 1,
    total: 0,
  });

  useEffect( ()=>{
    setData( data => ({ ...data, montos: montos }))
  }, [setData, montos]);

  return (
    <>
      <Grid container spacing={2} >

        <Grid item xs={12} sm={6}>

        </Grid>

        <Grid item xs={12} sm={6}>
            <List disablePadding >
              <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
                <ListItemText primary="Beneficio: " />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {data.beneficio.nombre}
                </Typography>
              </ListItem>
              <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
                <ListItemText primary="Grupo de Codigos: " />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {data.grupoCodigo.nombre}
                </Typography>
              </ListItem>
              { data.beneficio.nombre === 'PMI'?
                  <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
                    <ListItemText primary="Entrega N°: " />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {data.codigos.entrega}
                    </Typography>
                  </ListItem>
                  :
                  ''
              }
            </List>
        </Grid>

      </Grid>

      <Typography variant="h6" gutterBottom>
        Detalles de la Orden
      </Typography>

      <List disablePadding>

        {data.codigos.codigos.map((codigo) => (
          <ListItem key={codigo.id} sx={{ py: 1, px: 0 }} divider={true}>
            <ListItemText primary={codigo.nombre} secondary={`Codigo: ${codigo.codigo}`} />
            <ListItemText primary={codigo.cantidad}  />
            <Typography variant="body2">{`$ ${codigo.precio}`}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Sub Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {montos.subTotal}
          </Typography>
        </ListItem>

      </List>

      <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Prestador
          </Typography>

          <Typography gutterBottom>{data.prestador.razon}</Typography>
          <Typography gutterBottom>MP: {data.prestador.matricula}</Typography>
          <Typography gutterBottom>Domicilio: {data.prestador.domicilio}</Typography>

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
                $ {montos.subTotal}
                </Typography>
              </ListItem>

              <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
                <ListItemText primary="Cobertura AMECO" />
                <ListItemText>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                      id="beneficio-AMECO"
                      defaultValue={1}
                      value={montos.cobertura}
                      onChange={ e => setMontos( montos => ({
                        ...montos, 
                        cobertura: e.target.value,
                        total: montos.subTotal * ( 1 - e.target.value)
                      })) }
                    >
                      <MenuItem value={0}>Sin Cobertura</MenuItem>
                      <MenuItem value={0.5}>50%</MenuItem>
                      <MenuItem value={1}>100%</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemText>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                $ {montos.subTotal * montos.cobertura}
                </Typography>
              </ListItem>

              <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} >
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  $ {montos.total}
                </Typography>
              </ListItem>

            </List>
          </Box>
        
        </Grid>

      </Grid>

    </>
  );
}