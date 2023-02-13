import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { DataGrid, GridToolbar, GridActionsCellItem, gridClasses, esES } from '@mui/x-data-grid';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

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

  const columns = [
    { field: 'id', headerName: 'Orden N°', width: 75 },
    { field: 'dataBeneficiario', headerName: 'Beneficiario', width: 200, 
      valueGetter: params => 
        `${params.row.dataBeneficiario.apellidos}, ${params.row.dataBeneficiario.nombres}`
    },
    { field: 'dataTitular', headerName: 'Titular', width: 200, 
      valueGetter: params => 
        `${params.row.dataTitular.apellidos}, ${params.row.dataTitular.nombres}`
    },
    { field: 'dataBeneficio', headerName: 'Beneficio', width: 150, 
      valueGetter: params => 
        `${params.row.dataBeneficio.nombre}`
    },
    { field: 'dataGrupoCodigo', headerName: 'Grupo Codigo', width: 150, 
    valueGetter: params => 
      `${params.row.dataGrupoCodigo.nombre}`
  },
    { field: 'createdAt', headerName: 'Fecha', width: 200 },
    { field: 'actions', headerName: 'Acciones', width: 100, type: 'actions', cellClassName: 'actions',
      getActions: ({ row }) => 
          ([
            <GridActionsCellItem
              icon={<VolunteerActivismIcon />}
              label="orden"
              onClick={ ()=> navigate(`/panel/beneficios/ordenes/orden/${row.id}`)}
              color="inherit"
            />
          ])
    }
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

      <Box sx={{ height: 455, width: '100%' }} >

        <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between'}} >
          
          <Typography variant="h5" component="h5" >
            Ordenes
          </Typography>
          
          <Button variant="contained" disabled
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