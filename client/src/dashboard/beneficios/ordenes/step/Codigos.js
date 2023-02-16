import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { getGruposCodigos } from '../../../../actions/gruposCodigos';
import { getCodigos, getCodigosResponse } from '../../../../actions/codigos';

export default function Codigos({ data, setData }) {
  const dispatch = useDispatch();

  const gruposCodigos = useSelector( state => state.gruposCodigos);
  const codigos = useSelector( state => state.codigos);

  const [grupoSeleccionadoCodigos, setGrupoSeleccionadoCodigos] = useState([]); //Los codigos de un grupo seleccionado

  const handleChangeGrupo = (event) => {
    const selectGrupoCodigo = gruposCodigos.find( grupoCodigo => grupoCodigo.id === parseInt(event.target.value) );
    setData( data => { return {...data, grupoCodigo: selectGrupoCodigo, codigos : { ...data.codigos, codigos: [] } }});
    dispatch(getCodigos(event.target.value));
  };
  
  useEffect(() => {
    setData( data => ({ ...data, grupoCodigo: {} }) )
    dispatch(getGruposCodigos(data.beneficio.id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setGrupoSeleccionadoCodigos(codigos);
  }, [codigos]);

  useEffect(() => {
    return () => {
      dispatch(getCodigosResponse([]));
      //dispatch(getGruposCodigosResponse([]));
    };
    // eslint-disable-next-line
  }, []);

  const handleChangeCodigo = (event) => {
    //Verificamos si ya esta el codigo en el array
    const match = data.codigos.codigos.find(codigo => codigo.id === parseInt(event.target.name) );
    // match puede resultar en undefined o el elemento encontrado -> codigo {}
    if(match){ // Al estar el codigo en el Array lo sacamos
      const updateCodigos = data.codigos.codigos.filter(codigo => codigo.id !== parseInt(event.target.name) );
      setData( data => { return {
        ...data, codigos : { ...data.codigos, codigos: updateCodigos }
      }});
    }
    else { // Al no estar el codigo en el Array lo agregamos
      const addCodigo = codigos.find(codigo => codigo.id === parseInt(event.target.name) );
      setData( data => { return { ...data, codigos: { ...data.codigos, codigos: [ ...data.codigos.codigos, addCodigo ]} }});
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Seleccionar Codigos
      </Typography>

      <TextField
        required
        select
        id="grupo"
        name="grupo"
        label="Codigo Grupo"
        fullWidth
        value={data.grupoCodigo.id || ''}
        onChange={(e) => handleChangeGrupo(e)}
        >
        { gruposCodigos.map( (grupoCodigo, index) => (
          <MenuItem key={index} value={grupoCodigo.id}>
            {`${grupoCodigo.nombre}`}
          </MenuItem>
        ) ) }
        </TextField>

      <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
        <FormGroup>
          { 
            grupoSeleccionadoCodigos.map( codigo =>
              <FormControlLabel sx={{ m: 0 }}
                key={codigo.id}
                control={ 
                  <Checkbox
                    checked={ data.codigos.codigos.find( elementCodigo => elementCodigo === codigo.id.toString()) }
                    onChange={handleChangeCodigo} 
                    name={`${codigo.id}`} //El id es de type number, se lo cambia a string. name exige string.
                  /> 
                }
                label={`${codigo.codigo} - ${codigo.descripcion}`}
              />
            )
          }
        </FormGroup>

      </FormControl>


    </>
  );
}