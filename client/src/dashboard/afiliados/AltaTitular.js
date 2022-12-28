import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { validate } from './validate.js';
import { createAfiliadoTitular, getAfiliados } from '../../actions/afiliados';
import { getEmpleadores } from '../../actions/empleadores';

class InitialValuesForm {
  constructor(){
    this.apellidos = '';
    this.nombres = '';
    this.dni = '';
    this.sexo = '';
    this.nacimiento = '';
    this.estadoCivil = '';
    this.localidad = '';
    this.domicilio = '';
    this.celular = '';
    this.tipo = '';
    this.empleador= '';
  }
}

export default function AltaTitular() {
  
  const initialValues = new InitialValuesForm();
  const initialFormatError = new InitialValuesForm();
  const initialEmptyError = new InitialValuesForm();

  const [values, setValues] = useState({ ...initialValues, nacimiento: '01/01/1990'});
  const [formatError, setFormatError] = useState(initialFormatError);
  const [emptyError, setEmptyError] = useState(initialEmptyError);
  const [createdTitular, setCreatedTitular] = useState({});
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const empleadores = useSelector(state => state.empleadores);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handleChange lo invoca onChange, guarda el valor en un estado y valida el formato
  //(letras, numeros, otros caracteres)
  //No se lo aplica el handleChange al onChange del campo de Fecha de Nacimiento
  const handleChange = (event) => {
    setValues( values => {
      return { 
        ...values, 
        [event.target.name]: event.target.value
      }}
    );
    setFormatError( error => { 
      return {
        ...error, 
        [event.target.name]: validate(event.target.value, event.target.name)
      }}
    );
  };

  //Empty lo invoca onBlur(cuando se pierde el foco), unicamente para campos obligatorios
  //Ver la posibilidad de que verifique el formato en cuando cantidad de caracteres, 
  //verificar campos unicos, por ejemplo dni -> comparar si ya existe un afiliado con ese dni
  const Empty = (event) => {
    if(!event.target.value){
      setEmptyError( emptyError => { 
        return {
          ...emptyError, 
          [event.target.name]: true
        }
      })
    }
    else {
      setEmptyError( emptyError => { 
        return {
          ...emptyError, 
          [event.target.name]: false
        }
      })
    }
  }
  
  const handleSubmit = async() => {
    //verificar que existan valores en los campos obligatorios
    //verificar values.nacimiento.$d valido y dentro del intervalo [actual - 100 años]
    if(
      values.apellidos &&
      values.nombres &&
      values.dni &&
      values.sexo &&
      values.nacimiento.$d &&
      values.estadoCivil &&
      values.localidad &&
      values.tipo &&
      values.empleador
    ){
      //se arregla la fecha de nacimiento en el estado values
      setValues( state => { return { ...state, nacimiento: new Date(values.nacimiento.$d)}} )
      setLoading(true);
      const titular = await createAfiliadoTitular(values);
      if(titular) {
        setCreatedTitular(titular)
        setOpenDialog(true);
        dispatch(getAfiliados());
        setValues({ ...initialValues, nacimiento: '01/01/1990'});
        setLoading(false);
      }
      else alert('No se ha podido dar de Alta el Afiliado Titular. Verifique los datos, regrese atras y vuelva a intentarlo');
    } else {
      alert('Faltan Campos obligatorios');
    }
  };
  
  useEffect(()=>{
    dispatch(getEmpleadores());
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" width='100%' >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="h5" sx={{ textAlign: 'left', mt: 2 }} >
          Afiliados Titulares
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="apellidos"
                name="apellidos"
                label="Apellidos"
                fullWidth
                autoFocus
                value={values.apellidos}
                onChange={(event) => handleChange(event)}
                helperText={formatError.apellidos}
                error={(formatError.apellidos || emptyError.apellidos)? true : false}
                onBlur={ (event)=> Empty(event) }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="nombres"
                name="nombres"
                label="Nombres"
                fullWidth
                value={values.nombres}
                onChange={(e) => handleChange(e)}
                helperText={formatError.nombres}
                error={(formatError.nombres || emptyError.nombres)? true : false}
                onBlur={ (event)=> Empty(event) }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="dni"
                name="dni"
                label="DNI"
                max='8'
                fullWidth
                value={values.dni}
                onChange={(e) => handleChange(e)}
                helperText={formatError.dni}
                error={(formatError.dni || emptyError.dni)? true : false}
                onBlur={ (event)=> Empty(event) }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                select
                id="sexo"
                name='sexo'
                label="Sexo"
                fullWidth
                value={values.sexo}
                onChange={(e) => handleChange(e)}
                // helpertext={formatError.sexo}
                error={(formatError.sexo || emptyError.sexo)? true : false}
                onBlur={ (event)=> Empty(event) }
                >
                <MenuItem value={'sin especificar'}>Sin especificar</MenuItem>
                <MenuItem value={'varon'}>Varon</MenuItem>
                <MenuItem value={'mujer'}>Mujer</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DesktopDatePicker
                  label="Fecha de Nacimiento"
                  name='nacimiento'
                  minDate={`${new Date().getFullYear()-95}`} //Afiliados de hasta 95 años
                  maxDate={`${new Date().getFullYear()}`}
                  inputFormat="DD/MM/YYYY"
                  value={values.nacimiento}
                  onChange={(newDate) => {
                    setValues( state => {return { ...state, nacimiento: newDate }});
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth/>}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                select
                id="estadoCivil"
                name='estadoCivil'
                label="Estado Civil"
                fullWidth
                value={values.estadoCivil}
                onChange={(e) => handleChange(e)}
                // helpertext={formatError.estadoCivil}
                error={(formatError.estadoCivil || emptyError.estadoCivil)? true : false}
                onBlur={ (event)=> Empty(event) }
                >
                <MenuItem value={'sin especificar'}>Sin especificar</MenuItem>
                <MenuItem value={'soltero/a'}>Soltero/a</MenuItem>
                <MenuItem value={'casado/a'}>Casado/a</MenuItem>
                <MenuItem value={'union de hecho'}>Union de hecho</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="localidad"
                name="localidad"
                label="Localidad"
                fullWidth
                value={values.localidad}
                onChange={(e) => handleChange(e)}
                helperText={formatError.localidad}
                error={(formatError.localidad || emptyError.localidad)? true : false}
                onBlur={ (event)=> Empty(event) }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="domicilio"
                name="domicilio"
                label="Domicilio"
                fullWidth
                value={values.domicilio}
                onChange={(e) => handleChange(e)}
                helperText={formatError.domicilio}
                error={(formatError.domicilio || emptyError.domicilio)? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="celular"
                name="celular"
                label="Celular"
                fullWidth
                value={values.celular}
                onChange={(e) => handleChange(e)}
                helperText={formatError.celular}
                error={(formatError.celular || emptyError.celular)? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                select
                id="tipo"
                name='tipo'
                label="Tipo"
                fullWidth
                value={values.tipo}
                onChange={(e) => handleChange(e)}
                // helperText={formatError.tipo}
                error={(formatError.tipo || emptyError.tipo)? true : false}
                onBlur={ (event)=> Empty(event) }
                >
                <MenuItem value={'activo'}>Activo</MenuItem>
                <MenuItem value={'adherente'}>Adherente</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                select
                id="empleador"
                name='empleador'
                label="Empleador"
                fullWidth
                value={values.empleador}
                onChange={(e) => handleChange(e)}
                // helpertext={formatError.empleador}
                error={(formatError.empleador || emptyError.empleador)? true : false}
                onBlur={ (event)=> Empty(event) }
                >
                { empleadores.map( empleador => (
                  <MenuItem key={empleador.id} value={empleador.id}>
                    {`${empleador.razon} - ${empleador.cuit} - ${empleador.recaudador.apellidos}, ${empleador.recaudador.nombres}`}
                  </MenuItem>
                ) ) }
              </TextField>
            </Grid>
          </Grid>

          <Button onClick={handleSubmit} variant="contained" sx={{ m:2 }} disabled={loading} >
            Dar de Alta
          </Button>
          <Button onClick={() => navigate(-1)} variant="contained" sx={{ m:2 }} >
            Volver
          </Button>

        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={ () => setOpenDialog(false) }
        aria-labelledby="alert-dialog-alta-titular-exito"
        aria-describedby="Afiliado Titular dado de Alta con exito"
        >
        <DialogTitle id="alert-dialog-alta-titular-exito">
          ¡Alta exitosa!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El afiliado <strong>{createdTitular.apellidos}, {createdTitular.nombres}</strong> ha sido dado de Alta con exito.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => setOpenDialog(false) }>Salir</Button>
          <Button onClick={ 
            () => { 
              setOpenDialog(false);
              navigate(`/panel/participantes/${createdTitular.id}`); 
            }} 
            autoFocus>
            Agregar Participantes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}