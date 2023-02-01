import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { GridRowModes } from '@mui/x-data-grid';

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

export default function SelectBeneficios( { params, setRows, beneficios, rowModesModel}) {
  const currentRow = params.row;

  const handleChange = (event) => {
    const { target: { value } } = event;
    setRows( rows => { return rows.map( row => 
      row.id === currentRow.id? { ...row, beneficiosId: value } : row ) } 
    );
  };

  return (
      <FormControl sx={{ width: 300 }}>
        <Select
          id='selectBeneficios'
          name='selectBeneficios'
          multiple
          value={currentRow.beneficiosId}
          onChange={handleChange}
          renderValue={(selected) => {
            let selectedRender = beneficios.map( beneficio => 
                selected.includes(beneficio.id)? beneficio.nombre : false);
                selectedRender = selectedRender.filter( e => e !== false);
            return selectedRender.join(', ');
          }}
          MenuProps={MenuProps}
        >
          {beneficios.map((beneficio) => (
            <MenuItem 
              key={beneficio.id}
              value={beneficio.id}
              disabled={ rowModesModel[currentRow.id]?.mode === GridRowModes.Edit ? false : true}
            >
              <Checkbox checked={ currentRow.beneficiosId.includes(beneficio.id)? true : false } 
            />
              <ListItemText primary={beneficio.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
