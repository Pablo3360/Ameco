import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Orden() {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

      <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between'}} >
        
        <Typography variant="h5" component="h5" >
          Afiliados Titulares
        </Typography>

        <Box >
          <Button variant="contained" onClick={handlePrint} sx={{ mr: 2 }}>
            Imprimir
          </Button>
          
          <Button variant="contained" onClick={() => navigate(-1)} >
            Volver
          </Button>
        </Box>
        
      </Box>

      <Grid container spacing={0.5} sx={{ p:1 }} ref={componentRef}>

        <Grid item xs={6}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 200, 
              alignItems: 'center',
            }} 
            variant="outlined" square
            >
            <Typography variant="h5">
              A.M.E.C.O.
            </Typography>
            <Typography variant="subtitle1">
              Gobernador Barreyro N° 1.280 - 2do Piso
            </Typography>
            <Typography variant="subtitle1">
              Oberá Misiones
            </Typography>
            <Typography variant="subtitle2">
              Matrícula INAES N° 34
            </Typography>
            <Typography variant="subtitle2">
              Inscripción 08/01/1988
            </Typography>
            <Typography variant="subtitle2">
              CUIT 30672427467 
            </Typography>
            {/* <Typography variant="caption" align='center'>
              ASOCIACION MUTUAL DEL PERSONAL DEL COMERCIO Y ACTIVIDADES CIVILES DE LA CIUDAD DE OBERA Y DEPARTAMENTO DE OBERA Y DEPARTAMENTO LEANDRO N. ALEM DE LA PROVINCIA DE MISIONES
            </Typography> */}
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper variant="outlined" sx={{ p: 2, height: 200 }}>
            <Grid container spacing={2} >

              <Grid item xs={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Fecha: 14/01/2023
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Orden N°: 1.050
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 300 }}>
                  Beneficio: Odontologia
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 300 }}>
                  Grupo: Leche
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Prestador: Martinez Daniel
                </Typography>
              </Grid>

            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} variant="outlined" >

            <List disablePadding >

              <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
                <ListItemText primary="Titular: " />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Gomez, Damian  -   DNI: 16146101  -  Nacimiento: 11/02/1963
                </Typography>
              </ListItem>

              <ListItem  alignItems='center' sx={{ py: 1, px: 0 }} divider={true}>
                <ListItemText primary="Beneficiario " />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Gomez, Pablo  -   DNI: 36061893  -  Nacimiento: 18/01/1992
                </Typography>
              </ListItem>

            </List>

          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} variant="outlined" >

            <List disablePadding>


                <ListItem key='1' sx={{ py: 1, px: 0 }} divider={true}>
                  <ListItemText primary='Arreglo' secondary={`Codigo: 1.1`} />
                  <ListItemText primary='1'  />
                  <Typography variant="body2">{`$ 5000`}</Typography>
                </ListItem>

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Sub Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  $ 5000
                </Typography>
              </ListItem>

            </List>

          </Paper>
        </Grid>
        
      </Grid>

    </Container>
  );
}

