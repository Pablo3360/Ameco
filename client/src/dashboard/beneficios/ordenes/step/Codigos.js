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

import { getCodigos, getGruposCodigos } from '../../../../actions/codigos';

export default function Codigos({ data, setData }) {
  console.log(data.codigos);
  const dispatch = useDispatch();
  const codigos = useSelector( state => state.codigos);
  const grupos = useSelector( state => state.gruposCodigos); //[{ nombre: 'OSECAC'}, { nombre: 'COO'} ];

  const [grupo, setGrupos] = useState('');
  const [selectCodigos, setSelectCodigos] = useState([]);

  const handleChangeGrupo = (event) => {
    setGrupos(event.target.value)
  };

  const handleChangeCodigo = (event) => {
    //Verificamos si ya esta el codigo en el array
    const match = data.codigos.find(codigo => codigo.id === parseInt(event.target.name) );
    // match puede resultar en undefined o el elemento encontrado -> codigo {}
    if(match){ // Al estar el codigo en el Array lo sacamos
      const updateCodigos = data.codigos.filter(codigo => codigo.id !== parseInt(event.target.name) );
      setData( data => { return {
        ...data, codigos : updateCodigos
      }});
    }
    else { // Al no estar el codigo en el Array lo agregamos
      const addCodigo = codigos.find(codigo => codigo.id === parseInt(event.target.name) );
      setData( data => { return {
        ...data, codigos : [ ...data.codigos, addCodigo ]
      }});
    }
  };

  useEffect(() => {
    //guardo el Grupo seleccionado en data
    setData( data => { return {...data, grupo: grupo, codigos : [] }});
    //filtro codigos por grupo
    const selectCodigos = codigos.filter( codigo => codigo.grupo === grupo );
    setSelectCodigos(selectCodigos);
    // eslint-disable-next-line
  }, [grupo]);

  useEffect(() => {
    dispatch(getGruposCodigos())
    dispatch(getCodigos());
      // eslint-disable-next-line
  }, []);

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
        value={data.grupo}
        onChange={(e) => handleChangeGrupo(e)}
        >
        { grupos.map( (grupo, index) => (
          <MenuItem key={index} value={grupo.grupo}>
            {`${grupo.grupo}`}
          </MenuItem>
        ) ) }
        </TextField>

      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup>
          { 
            selectCodigos.map( codigo =>
              <FormControlLabel sx={{ m: 2 }}
                key={codigo.id}
                control={ 
                  <Checkbox
                    checked={ data.codigos.find( elementCodigo => elementCodigo === codigo.id.toString()) }
                    onChange={handleChangeCodigo} 
                    name={`${codigo.id}`} //El id es de type number, se lo cambia a string. name exige string.
                  /> 
                }
                label={`${codigo.grupo} - ${codigo.codigo} - ${codigo.nombre}`}
              />
            )
          }
        </FormGroup>

      </FormControl>


    </>
  );
}