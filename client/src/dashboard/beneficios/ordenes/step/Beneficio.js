import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { getBeneficios } from '../../../../actions/beneficios';

export default function AddressForm({ data, setData, setActiveStep }) {
  const dispatch = useDispatch();
  const beneficios = useSelector( state => state.beneficios);

  const handleChange = (event) => {
    const selectedBeneficio = beneficios.find( beneficio => beneficio.id === parseInt(event.target.value) );
    setData( state => { return { ...state, beneficio: selectedBeneficio }});
    setActiveStep( activeStep => activeStep + 1);
  };

  useEffect(() => {
    dispatch(getBeneficios());
      // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Elegir beneficio
      </Typography>

      <FormControl>
        <RadioGroup
          aria-labelledby="beneficios-group"
          name="beneficios"
          value={data.beneficio.id || ''}
          onChange={handleChange}
          >
          { beneficios.map( beneficio => 
            <FormControlLabel
              key={beneficio.id} 
              value={beneficio.id} 
              control={<Radio />} 
              label={beneficio.nombre} 
            />
          )}
        </RadioGroup>
      </FormControl>
    </>
  );
}