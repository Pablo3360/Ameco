import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { getPrestadores } from '../../../../actions/prestadores';

export default function Prestador({ data, setData }) {
  const dispatch = useDispatch();
  const prestadores = useSelector( state => state.prestadores);

  const handleChange = (event) => {
    setData( state => { return { ...state, prestador: event.target.value }})
  };

  useEffect(() => {
    dispatch(getPrestadores());
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
          value={data.prestador}
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