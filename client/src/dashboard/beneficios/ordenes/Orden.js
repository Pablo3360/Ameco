import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

import { getOrden } from '../../../actions/ordenes';

export default function Orden() {

  const navigate = useNavigate();
  const componentRef = useRef();
  const { ordenId } = useParams();

  const dispatch = useDispatch();
  const ordenR = useSelector( state => state.createdOrden );

  const [orden, setOrden] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(()=>{
    dispatch(getOrden(ordenId));
    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    setOrden(ordenR);
  }, [ordenR]);

  useEffect(()=>{
    return () => {
      setOrden(null);
    };
    // eslint-disable-next-line
  }, []);

  if( !orden ){
    return "Cargando";
  } else {
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
                alignItems: 'center',
                height: 160
              }} 
              variant="outlined"
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
                Matrícula INAES N° 34 - Inscripción 08/01/1988
              </Typography>
              <Typography variant="subtitle2">
                CUIT 30672427467 
              </Typography>
            </Paper>
          </Grid>
  
          <Grid item xs={6}>
            <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'row', height: 160 }}>
              <Grid container spacing={1} >
  
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Fecha: { orden.createdAt }
                  </Typography>
                </Grid>
  
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Orden N°: { orden.id }
                  </Typography>
                </Grid>
  
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Beneficio: { orden.dataBeneficio?.nombre }
                  </Typography>
                </Grid>
  
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Grupo: { orden.dataGrupoCodigo?.nombre }
                  </Typography>
                </Grid>
  
              </Grid>
            </Paper>
          </Grid>
  
          <Grid item xs={12}>
            <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }} variant="outlined" >
              <List disablePadding >
                <ListItem sx={{ py: 0, px: 1 }} divider={true} >
                  <ListItemText primary={`Titular: ${orden.dataTitular?.apellidos}, ${orden.dataTitular?.nombres} `} />
                  <ListItemText primary={`DNI: ${orden.dataTitular?.dni}`} />
                  <ListItemText primary={`Nacimiento: ${orden.dataTitular.nacimiento}`} />
                </ListItem>
                <ListItem sx={{ py: 0, px: 1 }} >
                  <ListItemText primary={`Beneficiario: ${orden.dataBeneficiario.apellidos}, ${orden.dataBeneficiario.nombres} `} />
                  <ListItemText primary={`DNI: ${orden.dataBeneficiario.dni}`} />
                  <ListItemText primary={`Nacimiento: ${orden.dataBeneficiario.nacimiento}`} />
                  { orden.dataBeneficiario.relacion && (
                    <ListItemText primary={`Vinculo: ${orden.dataBeneficiario.relacion}`} />
                  )}
                </ListItem>
              </List>
            </Paper>
          </Grid>
  
          <Grid item xs={12}>
            <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }} variant="outlined" >
              <List disablePadding>
                {orden.dataCodigos.codigos.map((codigo) => (
                  <ListItem key={codigo.id} sx={{ py: 0, px: 1 }} divider={true}>
                    <ListItemText primary={codigo.codigo} secondary='Codigo'/>
                    <ListItemText primary={codigo.descripcion} />
                    <ListItemText primary={codigo.cantidad} />
                    <Typography variant="body2">{`$ ${codigo.precio}`}</Typography>
                  </ListItem>
                ))}
                <ListItem sx={{ pt: 1, px: 1 }}>
                  <ListItemText primary="Sub Total" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    $ {orden.dataMontos.subTotal}
                  </Typography>
                </ListItem>
              </List>
            </Paper>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 150 }} variant="outlined" square >
  
              <Typography variant="subtitle1" gutterBottom >
                Prestador
              </Typography>
  
              <Typography variant="body1" sx={{ px: 1 }}>{orden.dataPrestador.razon}</Typography>
              <Typography variant="body1" sx={{ px: 1 }}>Matricula: {orden.dataPrestador.matricula}</Typography>
              <Typography variant="body1" sx={{ px: 1 }}>Domicilio: {orden.dataPrestador.domicilio}</Typography>
  
            </Paper>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height: 150  }} variant="outlined" square >
            
              <Typography variant="subtitle1" gutterBottom >
                Detalles de Pago
              </Typography>
  
              <Box sx={{ justifyContent: 'space-between' }}>
                <List disablePadding >
  
                  <ListItem  alignItems='center' sx={{ py: 0, px: 1 }} divider={true}>
                    <ListItemText primary="Sub Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    $ {orden.dataMontos.subTotal}
                    </Typography>
                  </ListItem>
  
                  <ListItem  alignItems='center' sx={{ py: 0, px: 1 }} divider={true}>
                    <ListItemText primary="Cobertura AMECO" />
                    <ListItemText>
                    {orden.dataMontos.cobertura *100 } %
                    </ListItemText>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    $ {orden.dataMontos.subTotal * orden.dataMontos.cobertura}
                    </Typography>
                  </ListItem>
  
                  <ListItem  alignItems='center' sx={{ py: 0, px: 1 }} >
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      $ {orden.dataMontos.total}
                    </Typography>
                  </ListItem>
  
                </List>
              </Box>
            </Paper>
          </Grid>
  
          <Grid item xs={12}>
            <Paper sx={{ p: 0}} variant="outlined" >
              <List disablePadding>
                <ListItem key='emisor' sx={{ pt: 4}}>
                    <ListItemText align='center' primary='_____________________' secondary={`Prestador: ${orden.dataPrestador.razon}`} />
                    <ListItemText align='center' primary='_____________________' secondary='Beneficiario' />
                    <ListItemText align='center' primary='_____________________' secondary='Autorizó' />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
        </Grid>
  
      </Container>
    );
  }

}

