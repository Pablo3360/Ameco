import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  createRecaudador, 
  RecaudadorResponse, 
  getRecaudadoresResponse, 
  updateRecaudador, 
  getRecaudadores
} from '../../actions/recaudadores';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { 
      id, 
      apellidos: '', 
      nombres: '', 
      dni: '',
      mail: '',
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
        Recaudador
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function Recaudadores() {

  const navigate = useNavigate();
  const recaudadores = useSelector(state => state.recaudadores);
  const createdRecaudador = useSelector(state => state.createdRecaudador);
  const dispatch = useDispatch();
  
  const [rows, setRows] = useState([]); // Estado con todas las filas y sus datos
  const [rowModesModel, setRowModesModel] = useState({}); // Modo de la fila, Edit o View
  const [pageSize, setPageSize] = useState(5);

  // Al montar el componente, pedimos a DB todos los recaudadores
  useEffect(() => {
    dispatch(getRecaudadores());
      // eslint-disable-next-line
  }, []);

  //Actualizamos el estado local 'rows' con los recaudadores del estado global
  useEffect( ()=>{
    setRows( rows => [ 
      ...rows, 
      ...recaudadores.map( recaudador => { 
        return { ...recaudador, isNew: false, isSaveInDb: true}
      })
    ]);
  }, [recaudadores]);

  //Borramos los recaudadores al desmontar el componente
  useEffect( ()=>{ 
    return ()=> { 
      dispatch( getRecaudadoresResponse([]) );
      dispatch( RecaudadorResponse({}) );
    }
    // eslint-disable-next-line
  }, []);

  // Cuando se guarde un recaudador en la Db, al recibir la respuesta, lo guardamos en el estado local
  useEffect(() => {
    const updatedRow = { ...createdRecaudador, isNew: false, isSaveInDb: true };
    setRows(rows.map((row) => (row.dni === createdRecaudador.dni ? updatedRow : row)));
    // eslint-disable-next-line
  }, [createdRecaudador]);

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

  //Borrar Recaudador cuando el usuario presiona "Basurero"
  const handleDeleteClick = (deleteRow) => () => {
    if(typeof(deleteRow.id) === 'string'){
      setRows(rows.filter((row) => row.id !== deleteRow.id));
    } else {
      alert('¿Esta seguro de querer Borrar el Recaudador?');
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
      alert('No es posible modificar el DNI de un recaudador');
      return prevRow;
    } else{
      const updatedRow = { ...newRow, isNew: false, isSaveInDb: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
  };

  // Cuando se presiona el Icon Guarda DB, se Valida y en caso de corresponder se lo guarda en la DB
  const handleSaveDb = (row) => () => {
    const { apellidos, nombres, dni, mail } = row;
    if( apellidos && nombres && dni && mail){
      const recaudadorId = row.id;
      delete row.id;
      delete row.isNew;
      delete row.isSaveInDb;
      if(typeof(recaudadorId) === 'number'){
        //se actualiza si el id es de type number
        dispatch(updateRecaudador( row, recaudadorId));
      } else {
        //se crea si el id es de type string
        dispatch(createRecaudador( row ));
      }
    } else {
      alert ('Faltan ingresar campos obligatorios');
    }
  };

  const columns = [
    { field: 'apellidos', headerName: 'Apellidos', width: 200, editable: true },
    { field: 'nombres', headerName: 'Nombres', width: 200, editable: true },
    { field: 'dni', headerName: 'DNI', editable: true },
    { field: 'mail', headerName: 'Mail', width: 200, hideable: true, editable: true },
    { field: 'created_at', headerName: 'Creado', width: 200, hideable: true, editable: false },
    { field: 'actions', headerName: 'Acciones', width: 125, type: 'actions', cellClassName: 'actions',
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
            Recaudadores
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