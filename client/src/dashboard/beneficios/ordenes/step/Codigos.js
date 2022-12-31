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
  const dispatch = useDispatch();
  const codigos = useSelector( state => state.codigos);

  const grupos = useSelector( state => state.gruposCodigos);
  // const grupos = [{ nombre: 'OSECAC'}, { nombre: 'COO'} ];

  const [grupo, setGrupos] = useState('');
  const [selectCodigos, setSelectCodigos] = useState([]);

  const handleChangeGrupo = (event) => {
    setGrupos(event.target.value)
  };

  const handleChangeCodigo = (event) => {
    //Verificamos si ya esta el codigo en el array
    const match = data.codigos.includes(event.target.name);
    //Si esta en el array y el valor es false, es decir se 'desmarco', sacamos el codigo y seteamos el array
    //Caso contrario, se guarda el codigo en el array. Es decir cada vez que se marque Check.
    if(match && event.target.checked === false){
      const updateCodigos = data.codigos.filter(codigo => codigo !== event.target.name);
      setData( data => { return {
        ...data, codigos : updateCodigos
      }});
    } else {
      setData( data => { return {
        ...data, codigos : [ ...data.codigos, event.target.name ]
      }});
    }
  };

  useEffect(() => {
    //filtro codigos por grupo
    setData( data => { return {...data, grupo: grupo, codigos : [] }});
    const selectCodigos = codigos.filter( codigo => codigo.grupo === grupo );
    console.log('SelectCodigos', selectCodigos);
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
                    checked={data.codigos.includes(`${codigo.id}`)}
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