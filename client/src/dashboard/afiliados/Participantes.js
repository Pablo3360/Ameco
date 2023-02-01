import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageIcon from '@mui/icons-material/Storage';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { grey } from '@mui/material/colors';
import {
  GridRowModes, 
  DataGrid, 
  GridToolbarContainer, 
  GridActionsCellItem, 
  gridClasses, 
  esES 
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { 
  createParticipante, 
  ParticipanteResponse, 
  getParticipantes, 
  getParticipantesResponse, 
  updateParticipante 
} from '../../actions/participantes';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { 
      id, 
      apellidos: '', 
      nombres: '', 
      dni: '',
      sexo: '',
      nacimiento: '',
      relacion: '',
      isNew: true,
      isSaveInDb: false
    }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'apellidos' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
        Participante
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function Participantes() {

  const navigate = useNavigate();
  const participantes = useSelector(state => state.participantes);
  const createdParticipante = useSelector(state => state.createdParticipante);
  const dispatch = useDispatch();
  const { titularId } = useParams();
  
  const [rows, setRows] = useState([]); // Estado con todas las filas y sus datos
  const [rowModesModel, setRowModesModel] = useState({}); // Modo de la fila, Edit o View
  const [pageSize, setPageSize] = useState(5);

  // Al montar el componente, pedimos a DB todos los participantes del Titular para guardarlos en el estado global
  useEffect(() => {
    dispatch(getParticipantes(titularId));
      // eslint-disable-next-line
  }, []);

  //Actualizamos el estado local 'rows' con los participantes del estado global
  useEffect( ()=>{
    setRows( rows => [ 
      ...rows, 
      ...participantes.map( participante => { 
        return { ...participante, isNew: false, isSaveInDb: true}
      })
    ]);
  }, [participantes]);

  //Borramos los participantes al desmontar el componente
  useEffect( ()=>{ 
    return ()=> { 
      dispatch( getParticipantesResponse([]) );
      dispatch( ParticipanteResponse({}) );
    }
    // eslint-disable-next-line
  }, []);

  // Cuando se guarde un participante en la Db, al recibir la respuesta, lo guardamos en el estado local
  useEffect(() => {
    const updatedRow = { ...createdParticipante, isNew: false, isSaveInDb: true };
    setRows(rows.map((row) => (row.dni === createdParticipante.dni ? updatedRow : row)));
    // eslint-disable-next-line
  }, [createdParticipante]);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  // Cambiar el Modo de la Fila de View -> Edit
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  // Cambiar el Modo de la Fila de Edit -> View cuando el usuario presiona el Icon Save
  const handleSaveClick = (newRow) => () => {
    setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.View } });
  };

  //Borrar Participante cuando el usuario presiona "Basurero"
  const handleDeleteClick = (deleteRow) => () => {
    if(typeof(deleteRow.id) === 'string'){
      setRows(rows.filter((row) => row.id !== deleteRow.id));
    } else {
      alert('¿Esta seguro de querer Borrar el Participante?');
    }
    
  };

  // Cancelar Edicion. Cambia el Modo de la fila a View (ignorando los cambios realizados) y
  // si es nueva (isNew), la elimina del estado de filas (nunca se llego a guardar la fila por parte del usuario) 
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  //Cuando se presiona el Icon Save, se guarda en el estado Rows la fila y se retorna la fila para
  //actualizar el estado interno.
  const processRowUpdate = (newRow, prevRow) => {
    if(typeof(newRow.id) === 'number' && prevRow.dni !== newRow.dni){
      alert('No es posible modificar el DNI de un participante');
      return prevRow;
    } else{
      const updatedRow = { ...newRow, isNew: false, isSaveInDb: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
  };

  // Cuando se presiona el Icon Guarda DB, se Valida y en caso de corresponder se lo guarda en la DB
  const handleSaveDb = (row) => () => {
    const { apellidos, nombres, dni, sexo, nacimiento, relacion } = row;
    if( apellidos && nombres && dni && sexo && relacion && nacimiento){
      const participanteId = row.id;
      delete row.id;
      delete row.isNew;
      delete row.isSaveInDb;
      if(typeof(participanteId) === 'number'){
        //se actualiza los id type number
        dispatch(updateParticipante( row, participanteId));
      } else {
        //se crea los id type string
        dispatch(createParticipante( row, titularId));
      }
    } else {
      alert ('Todos los campos son obligatorios');
    }
  };

  const columns = [
    { field: 'apellidos', headerName: 'Apellidos', width: 200, editable: true },
    { field: 'nombres', headerName: 'Nombres', width: 200, editable: true },
    { field: 'dni', headerName: 'DNI', hideable: false, editable: true },
    { field: 'sexo', headerName: 'Sexo', width: 125, type: 'singleSelect', 
      valueOptions: ['varon', 'mujer', 'sin especificar'], editable: true},
    { field: 'nacimiento', headerName: 'Nacimiento', width: 125, type: 'date', editable: true },
    { field: 'relacion', headerName: 'Relacion', width: 125, type: 'singleSelect', 
      valueOptions: ['pareja', 'hijo/a', 'padre/madre'], editable: true},
    { field: 'actions', headerName: 'Acciones', width: 150, type: 'actions', cellClassName: 'actions',
      getActions: ({ row }) => {
        const isInEditMode = rowModesModel[row.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(row)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row.id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
            disabled={ typeof(row.id) === 'number'? true : false}
          />,
          <GridActionsCellItem
          icon={row.isSaveInDb? <StorageIcon /> : <CloudUploadIcon color='primary' />}
          label="Save"
          onClick={handleSaveDb( {...row} )}
          color="inherit"
          disabled={ row.isSaveInDb? true : false}
          />,
          <GridActionsCellItem
          icon={<VolunteerActivismIcon />}
          label="beneficios"
          onClick={ () => navigate(`/panel/beneficios/ordenes/nueva?titularId=${row.titularId}&beneficiarioId=${row.id}`) }
          color="inherit"
          />
        ];
      },
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ height: 455, width: '100%' }} >

        <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between'}} >
          <Typography variant="h5" component="h5" >
            Participantes
          </Typography>
          <Button variant="contained"
              onClick={() => navigate(-1)}
              >
              Volver
          </Button>
        </Box>

        <DataGrid localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={rows} //Array con la informacion de cada fila
          
          columns={columns}

          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

          editMode="row"
          rowModesModel={rowModesModel} // Objeto con el id de cada fila y su Modo: view o edit
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)} //Setea el Modo de la fila
          onRowEditStart={handleRowEditStart} // mouse and keyboard interactions that start
          onRowEditStop={handleRowEditStop} // mouse and keyboard interactions that stop 
          processRowUpdate={processRowUpdate}

          components={{ Toolbar: EditToolbar }}
          componentsProps={{ toolbar: { setRows, setRowModesModel } }}
          experimentalFeatures={{ newEditingApi: true }}

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
        />
      </Box>
    </Box>
  );
}