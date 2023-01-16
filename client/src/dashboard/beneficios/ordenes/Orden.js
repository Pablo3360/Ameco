import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useNavigate, useParams } from 'react-router-dom';
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

  const navigate = useNavigate();
  const componentRef = useRef();
  const { ordenId } = useParams();

  const [orden, setOrden] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(()=>{
    async function getOrden(ordenId){
      await fetch(`http://localhost:3001/orden/${ordenId}`)
        .then(r => r.json())
        .then( orden => setOrden(orden))
        .catch( error => console.log(error))
    };
    getOrden(ordenId);
  }, [ordenId]);

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
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper variant="outlined" sx={{ p: 2, height: 200 }}>
            <Grid container spacing={0} >

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
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }} variant="outlined" >

            <List disablePadding >

              <ListItem  alignItems='center' sx={{ py: 0, px: 1 }} divider={true}>
                <ListItemText primary="Titular: " />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Gomez, Damian  -   DNI: 16146101  -  Nacimiento: 11/02/1963
                </Typography>
              </ListItem>

              <ListItem  alignItems='center' sx={{ py: 0, px: 1 }} divider={true}>
                <ListItemText primary="Beneficiario " />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Gomez, Pablo  -   DNI: 36061893  -  Nacimiento: 18/01/1992
                </Typography>
              </ListItem>

            </List>

          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }} variant="outlined" >

            <List disablePadding>

            {orden?.dataCodigos.codigos.map((codigo) => (
              <ListItem key={codigo.id} sx={{ py: 0, px: 1 }} divider={true}>
                <ListItemText primary={codigo.nombre} secondary={`Codigo: ${codigo.codigo}`} />
                <ListItemText primary={codigo.descripcion}  />
                <ListItemText primary={codigo.cantidad}  />
                <Typography variant="body2">{`$ ${codigo.precio}`}</Typography>
              </ListItem>
            ))}

            <ListItem sx={{ py: 0, px: 1 }}>
              <ListItemText primary="Sub Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                $ {orden?.dataMontos.subTotal}
              </Typography>
            </ListItem>

            </List>

          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }} variant="outlined" square >

            <Typography variant="h6" gutterBottom >
              Prestador
            </Typography>

            {/* <Typography gutterBottom>{data.prestador.razon}</Typography>
            <Typography gutterBottom>MP: {data.prestador.matricula}</Typography>
            <Typography gutterBottom>Domicilio: {data.prestador.domicilio}</Typography> */}

          </Paper>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }} variant="outlined" square >
          
            <Typography variant="h6" gutterBottom >
              Detalles de Pago
            </Typography>

            <Box sx={{ justifyContent: 'space-between' }}>
              <List disablePadding >

                <ListItem  alignItems='center' sx={{ py: 0, px: 1 }} divider={true}>
                  <ListItemText primary="Sub Total" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  $ {orden?.dataMontos.subTotal}
                  </Typography>
                </ListItem>

                <ListItem  alignItems='center' sx={{ py: 0, px: 1 }} divider={true}>
                  <ListItemText primary="Cobertura AMECO" />
                  <ListItemText>
                  {orden?.dataMontos.cobertura *100 } %
                  </ListItemText>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  $ {orden?.dataMontos.subTotal * orden?.dataMontos.cobertura}
                  </Typography>
                </ListItem>

                <ListItem  alignItems='center' sx={{ py: 0, px: 1 }} >
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    $ {orden?.dataMontos.total}
                  </Typography>
                </ListItem>

              </List>
            </Box>
          </Paper>
        </Grid>
        
      </Grid>

    </Container>
  );
}

