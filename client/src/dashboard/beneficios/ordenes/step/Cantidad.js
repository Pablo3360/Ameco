import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses, esES } from '@mui/x-data-grid';

// import { getCodigos } from '../../../../actions/codigos';

export default function Cantidad({ data, setData }) {

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const codigos = useSelector( state => state.codigos);

  const selectCodigos = [];
  for ( let i = 0; i < data.codigos.length; i++){
    selectCodigos.push(codigos.find( codigo => codigo.id === parseInt(data.codigos[i]) ) );
  }

  const columns = [
    { field: 'grupo', headerName: 'Grupo Codigo', width: 115, editable: false },
    { field: 'codigo', headerName: 'Codigo', width: 75, editable: false },
    { field: 'nombre', headerName: 'Nombre', width: 200, editable: false },
    { field: 'cantidad', headerName: 'Cantidad', editable: true }
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Indicar Cantidad
      </Typography>

      <Box sx={{ height: 455, width: '100%' }} >

      <DataGrid localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          rows={selectCodigos}
          rowsPerPageOptions={[5, 10, 20]}
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

          onCellEditCommit={(params) => setRowId(params.id)}
      />
      </Box>

    </>
  );
}