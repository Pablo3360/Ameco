import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses, esES } from '@mui/x-data-grid';

import { getEntrega } from '../../../../actions/ordenes';

export default function Cantidad({ data, setData }) {

  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(3);
  const lastEntrega = useSelector( state => state.lastEntrega);

  const columns = [
      { field: 'codigo', headerName: 'Codigo', width: 100, editable: false },
      { field: 'nombre', headerName: 'Nombre', width: 400, editable: false },
      { field: 'precio', headerName: 'Precio', width: 100, editable: false },
      { field: 'cantidad', headerName: 'Cantidad', type: 'number', editable: true },
    ];

  if(data.beneficio.nombre === 'PMI'){
    columns.push(
      { field: 'entrega', headerName: 'Entrega N°', type: 'number' }
    )
  }

  const handleEditCommit = (params) => {

    const updateCodigos = data.codigos.map( codigo => codigo.id === params.id ? 
      { ...codigo, cantidad: params.value } : codigo );

    setData( data => { return {
      ...data, codigos : updateCodigos
    }});

  };

  useEffect(() => {
    dispatch(getEntrega(data.titular.id, data.beneficiario.id, data.grupoCodigo.id));
    // eslint-disable-next-line
  }, [data.beneficiario]);

  useEffect(() => {

    const updateCodigos = data.codigos.map( codigo => ({ ...codigo, entrega: lastEntrega + 1 }) );

    setData( data => { return {
      ...data, codigos: updateCodigos
    }});
    // eslint-disable-next-line
  }, [lastEntrega]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Indicar Cantidad
      </Typography>

      <Box sx={{ height: 280, width: '100%' }} >

      <DataGrid localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          rows={data.codigos}
          rowsPerPageOptions={[3, 6]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 3,
            bottom: params.isLastVisible ? 0 : 3,
          })}
          
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? grey[200] : grey[900],
            },
          }}

          onCellEditCommit={(params) => handleEditCommit(params)}
      />
      </Box>

    </>
  );
}