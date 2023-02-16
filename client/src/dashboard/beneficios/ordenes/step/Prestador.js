import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { getPrestadoresBeficioId, getPrestadoresResponse } from '../../../../actions/prestadores';

export default function Prestador({ data, setData, setActiveStep }) {
  const dispatch = useDispatch();
  const prestadores = useSelector( state => state.prestadores);

  const handleChange = (event) => {
    const selectedPrestador = prestadores.find( prestador => prestador.id === parseInt(event.target.value) );
    setData( state => { return { ...state, prestador: selectedPrestador }});
    setActiveStep( activeStep => activeStep + 1 );
  };

  useEffect(() => {
    dispatch(getPrestadoresBeficioId(data.beneficio.id));
      // eslint-disable-next-line
  }, []);

  //Borramos los prestadores al desmontar el componente
  useEffect( ()=>{ 
    return ()=> { 
      dispatch( getPrestadoresResponse([]) );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Elegir Prestador
      </Typography>

      <FormControl>
        <RadioGroup
          aria-labelledby="prestador-group"
          name="prestador"
          value={data.prestador.id || ''}
          onChange={handleChange}
          >
          { prestadores.map( prestador => 
            <FormControlLabel
              key={prestador.id} 
              value={prestador.id} 
              control={<Radio />} 
              label={prestador.razon} 
            />
          )}
        </RadioGroup>
      </FormControl>
    </>
  );
}