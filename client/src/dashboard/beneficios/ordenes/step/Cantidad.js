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
      { field: 'codigo', headerName: 'Codigo', width: 100, editable: false, headerAlign: 'center', align: 'center' },
      { field: 'nombre', headerName: 'Nombre', width: 400, editable: false, headerAlign: 'center', align: 'center' },
      { field: 'precio', headerName: 'Precio', width: 100, editable: false, headerAlign: 'center', align: 'center' },
      { field: 'cantidad', headerName: 'Cantidad', type: 'number', editable: true, headerAlign: 'center', align: 'center' },
    ];

  if(data.beneficio.nombre === 'PMI'){
    columns.unshift(
      { field: 'entrega', headerName: 'Entrega N°', type: 'number', renderCell: () => lastEntrega + 1,
        headerAlign: 'center', align: 'center'
      }
    );
  };

  const handleEditCommit = (params) => {

    const updateCodigos = data.codigos.codigos.map( codigo => codigo.id === params.id ? 
      { ...codigo, cantidad: params.value } : codigo );

    setData( data => { return {
      ...data, codigos: { ...data.codigos, codigos: updateCodigos}
    }});

  };

  useEffect(() => {
    dispatch(getEntrega(data.titular.id, data.beneficiario.id, data.grupoCodigo.id));
    // eslint-disable-next-line
  }, [data.beneficiario]);

  useEffect(() => {

    setData( data => { return {
      ...data, codigos: { ...data.codigos, entrega: lastEntrega + 1 }
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
          rows={data.codigos.codigos}
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