import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function SelectBeneficios( { params, beneficios}) {
    console.log('params', params);
    console.log('beneficios', beneficios);
  const [selectBeneficios, setSelectBeneficios] = useState([]);

  //setear rows del componente padre: prestadores, con los valores de selectBeneficios

  const handleChange = (event) => {
    console.log('event', event);
    const { target: { value } } = event;
    setSelectBeneficios(value);
  };

  return (
      <FormControl sx={{ width: 300 }}>
        <Select
          id='selectBeneficios'
          name='selectBeneficios'
          multiple
          value={selectBeneficios}
          onChange={handleChange}
          renderValue={(selected) => {
            console.log('selected', selected);
            let selectedRender = beneficios.map( beneficio => 
                selected.includes(beneficio.id)? beneficio.nombre : false);
                selectedRender = selectedRender.filter( e => e !== false);
            return selectedRender.join(', ');
          }}
          MenuProps={MenuProps}
        >
          {beneficios.map((beneficio) => (
            <MenuItem key={beneficio.id} value={beneficio.id}>
              <Checkbox checked={ selectBeneficios.includes(beneficio.id)? true : false } />
              <ListItemText primary={beneficio.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
