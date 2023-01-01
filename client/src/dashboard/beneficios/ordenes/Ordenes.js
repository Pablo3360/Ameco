import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { DataGrid, GridToolbar, gridClasses, esES } from '@mui/x-data-grid';

import { getOrdenes } from '../../../actions/ordenes';

function OrdenesContent() {

  const ordenes = useSelector( state => state.ordenes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(getOrdenes());
      // eslint-disable-next-line
  }, []);

  function getFullName(params) {
    return `${params.row.apellidos}, ${params.row.nombres}`;
  }

  const columns = [
      { field: 'beneficiario', headerName: 'Beneficiario', width: 200, valueGetter: getFullName},
      { field: 'participanteId', headerName: 'Apellidos', width: 170, editable: true },
      { field: 'nombres', headerName: 'Nombres', width: 170, editable: true },

      { field: 'nacimiento', headerName: 'Nacimiento', type: 'date', editable: true },
      { field: 'tipo', headerName: 'Tipo', width: 85, type: 'singleSelect', 
        valueOptions: ['activo', 'adherente'], editable: true},
      { field: 'localidad', headerName: 'Localidad', width: 125, editable: true},
      { field: 'celular', headerName: 'Celular', width: 105, editable: true },
      { field: 'estado_civil', headerName: 'Estado Civil', width: 125, type: 'singleSelect', 
        valueOptions: ['casado/a', 'soltero/a', 'union de hecho', 'sin especificar'], editable: true },
      { field: 'domicilio', headerName: 'Domicilio', width: 250, editable: true },
      { field: 'created_at', headerName: 'Fecha Creación', width: 200 },
    ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

      <Box sx={{ height: 455, width: '100%' }} >

        <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between'}} >
          
          <Typography variant="h5" component="h5" >
            Ordenes
          </Typography>
          
          <Button variant="contained"
            onClick={() => navigate('/panel/beneficios/ordenes/nueva')}
            >
            Nueva Orden
          </Button>
          
        </Box>

        <DataGrid localeText={esES.components.MuiDataGrid.defaultProps.localeText}

          initialState={{
            columns: {
              columnVisibilityModel: {
                apellidos: false,
                nombres: false,
                sexo: false,
                created_at: false,
                domicilio: false,
                estado_civil: false,
              },
            },
          }}
          columns={columns}
          rows={ordenes}
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

          components={{ Toolbar: GridToolbar }}
        />
      </Box>

    </Box>
  );
}

export default function Ordenes() {
  return <OrdenesContent />;
}