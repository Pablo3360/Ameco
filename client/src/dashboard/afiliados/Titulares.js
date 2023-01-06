import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { DataGrid, GridToolbar, gridClasses, esES } from '@mui/x-data-grid';

import { getAfiliados } from '../../actions/titulares';
import TitularActions from './TitularActions';

function AfiliadosContent() {

  const afiliados = useSelector( state => state.afiliados);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(getAfiliados());
      // eslint-disable-next-line
  }, []);

  function getFullName(params) {
    return `${params.row.apellidos}, ${params.row.nombres}`;
  }

  const columns = useMemo(
    () => [
      { field: 'fullName', headerName: 'Nombre Completo', width: 225, valueGetter: getFullName},
      { field: 'apellidos', headerName: 'Apellidos', width: 170, editable: true },
      { field: 'nombres', headerName: 'Nombres', width: 170, editable: true },
      { field: 'dni', headerName: 'DNI', hideable: false, editable: false },
      { field: 'estado', headerName: 'Estado', width: 85, type: 'singleSelect', 
      valueOptions: ['activo', 'inactivo'], editable: true},
      { field: 'sexo', headerName: 'Sexo', width: 85, type: 'singleSelect', 
        valueOptions: ['varon', 'mujer', 'sin especificar'], editable: true},
      { field: 'nacimiento', headerName: 'Nacimiento', type: 'date', editable: true },
      { field: 'tipo', headerName: 'Tipo', width: 85, type: 'singleSelect', 
        valueOptions: ['activo', 'adherente'], editable: true},
      { field: 'localidad', headerName: 'Localidad', width: 125, editable: true},
      { field: 'celular', headerName: 'Celular', width: 105, editable: true },
      { field: 'estado_civil', headerName: 'Estado Civil', width: 125, type: 'singleSelect', 
        valueOptions: ['casado/a', 'soltero/a', 'union de hecho', 'sin especificar'], editable: true },
      { field: 'domicilio', headerName: 'Domicilio', width: 250, editable: true },
      { field: 'created_at', headerName: 'Fecha Creación', width: 200 },
      { field: 'actions', headerName: 'Acciones', type: 'actions', width: 125,
        renderCell: (params) => ( <TitularActions {...{ params, rowId, setRowId }} />)}
    ],
    [rowId]
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

      <Box sx={{ height: 455, width: '100%' }} >

        <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between'}} >
          
          <Typography variant="h5" component="h5" >
            Afiliados Titulares
          </Typography>
          
          <Button variant="contained"
            onClick={() => navigate('/panel/titulares/crear')}
            >
            Alta Afiliado
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
          rows={afiliados}
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
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

    </Box>
  );
}

export default function Afiliados() {
  return <AfiliadosContent />;
}