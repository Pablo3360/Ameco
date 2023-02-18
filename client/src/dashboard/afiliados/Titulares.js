import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { DataGrid, GridToolbar, gridClasses, esES } from '@mui/x-data-grid';
import ButtonMenu from '../../components/ButtonMenu';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import CustomSnackbar from '../../components/Snackbar';

import { getAfiliados, showDeletedTitulares } from '../../actions/titulares';
import { getEmpleadores } from '../../actions/empleadores';
import { Error } from '../../actions/error';
import TitularActions from './TitularActions';

function AfiliadosContent() {

  const afiliados = useSelector( state => state.afiliados);
  const deletedTitulares = useSelector( state => state.deletedTitulares)
  const empleadores = useSelector( state => state.empleadores);
  const error = useSelector ( state => state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    dispatch(getAfiliados(deletedTitulares));
    dispatch(getEmpleadores());
    return () => dispatch(Error({}));
      // eslint-disable-next-line
  }, [deletedTitulares]);

  function getFullName(params) {
    return `${params.row.apellidos}, ${params.row.nombres}`;
  }

  const columns = [
    { field: 'fullName', headerName: 'Nombre Completo', width: 225, valueGetter: getFullName},
    { field: 'apellidos', headerName: 'Apellidos', width: 170, editable: true },
    { field: 'nombres', headerName: 'Nombres', width: 170, editable: true },
    { field: 'dni', headerName: 'DNI', hideable: false, editable: false },
    { field: 'empleadorId', headerName: 'Empleador', width: 225, type: 'singleSelect', 
      valueOptions: empleadores.map( empleador => { 
        return { value: empleador.id , label : `${empleador.razon}` }} ), 
      editable: true,
      valueFormatter: (params) => {
        const empleador = empleadores.find( empleador => empleador.id === parseInt(params.value));
        const valueFormatted = empleador? empleador.razon : '';
        return valueFormatted;
      }
    },
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
    { field: 'createdAt', headerName: 'Fecha Creación', width: 200 },
    { field: 'actions', headerName: 'Acciones', type: 'actions', width: 200,
      renderCell: (params) => ( <TitularActions {...{ params, rowId, setRowId, deletedTitulares }} />)}
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

      <Box sx={{ height: 455, width: '100%' }} >

        <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between'}} >
          
          <Typography variant="h5" component="h5" >
            Afiliados Titulares
          </Typography>

          <Box sx={{ mb:2, display: 'flex', justifyContent: 'flex-end'}} >

            <Button sx={{ mr:2}}
              variant="contained"
              onClick={() => navigate('/panel/titulares/crear')}
              >
              Alta Afiliado
            </Button>

            <ButtonMenu
              actions={
                [
                  { 
                    handleClick: () => dispatch(showDeletedTitulares(deletedTitulares)), 
                    icon: deletedTitulares? <PersonIcon /> : <PersonOffIcon />, 
                    text: deletedTitulares? 'Ver Activos' : 'Ver eliminados' },
                ]
              } 
            />

          </Box>
          
        </Box>

        <DataGrid localeText={esES.components.MuiDataGrid.defaultProps.localeText}

          initialState={{
            columns: {
              columnVisibilityModel: {
                apellidos: false,
                nombres: false,
                sexo: false,
                createdAt: false,
                domicilio: false,
                localidad: false,
                tipo: false,
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

      {error.message && (<CustomSnackbar message={error.message} />)}

    </Box>
  );
}

export default function Afiliados() {
  return <AfiliadosContent />;
}