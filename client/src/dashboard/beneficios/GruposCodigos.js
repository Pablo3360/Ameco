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
  createGrupoCodigo, 
  GrupoCodigoResponse, 
  getGruposCodigosResponse, 
  updateGrupoCodigo, 
  getGruposCodigos
} from '../../actions/gruposCodigos';

import { getBeneficios } from '../../actions/beneficios';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { 
      id, 
      beneficioId: '',
      nombre: '', 
      descripcion: '',
      isNew: true,
      isSaveInDb: false
    }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'beneficioId' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
        Grupo de Codigos
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function GruposCodigos() {

  const navigate = useNavigate();
  const beneficios = useSelector(state => state.beneficios);
  const gruposCodigos = useSelector(state => state.gruposCodigos);
  const createdGrupoCodigo= useSelector(state => state.createdGrupoCodigo);
  const dispatch = useDispatch();
  
  const [rows, setRows] = useState([]); // Estado con todas las filas y sus datos
  const [rowModesModel, setRowModesModel] = useState({}); // Modo de la fila, Edit o View
  const [pageSize, setPageSize] = useState(5);

  // Al montar el componente, pedimos a DB todos los gruposCodigos
  useEffect(() => {
    dispatch(getBeneficios());
    dispatch(getGruposCodigos());
      // eslint-disable-next-line
  }, []);

  //Actualizamos el estado local 'rows' con los gruposCodigos del estado global
  useEffect( ()=>{
    setRows( rows => [ 
      ...rows, 
      ...gruposCodigos.map( grupoCodigo => { 
        return { ...grupoCodigo, isNew: false, isSaveInDb: true}
      })
    ]);
  }, [gruposCodigos]);

  //Borramos los gruposCodigos al desmontar el componente
  useEffect( ()=>{ 
    return ()=> { 
      dispatch( getGruposCodigosResponse([]) );
      dispatch( GrupoCodigoResponse({}) );
    }
    // eslint-disable-next-line
  }, []);

  // cuando se guarde un grupoCodigo en la Db, al recibir la respuesta, lo guardamos en el estado local
  useEffect(() => {
    const updatedRow = { ...createdGrupoCodigo, isNew: false, isSaveInDb: true };
    setRows(rows.map((row) => (row.nombre === createdGrupoCodigo.nombre ? updatedRow : row)));
    // eslint-disable-next-line
  }, [createdGrupoCodigo]);

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

  //Borrar grupoCodigo cuando el usuario presiona "Basurero"
  const handleDeleteClick = (deleteRow) => () => {
    if(typeof(deleteRow.id) === 'string'){
      setRows(rows.filter((row) => row.id !== deleteRow.id));
    } else {
      alert('¿Esta seguro de querer Borrar el GrupoCodigo?');
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

  //cuando se presiona el Icon Save, se guarda en el estado Rows la fila y se retorna la fila para
  //actualizar el estado interno.
  const processRowUpdate = (newRow, prevRow) => {
    if(typeof(newRow.id) === 'number' && (prevRow.nombre !== newRow.nombre || prevRow.beneficioId !== newRow.beneficioId)){
      alert('No es posible modificar el Nombre ni el Beneficio de un GrupoCodigo');
      return prevRow;
    } else{
      const updatedRow = { ...newRow, isNew: false, isSaveInDb: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
  };

  // cuando se presiona el Icon Guarda DB, se Valida y en caso de corresponder se lo guarda en la DB
  const handleSaveDb = (row) => () => {
    const { nombre, beneficioId} = row;
    if( nombre && beneficioId ){
      const grupoCodigoId = row.id;
      const beneficioId = row.beneficioId;
      delete row.id;
      delete row.beneficioId;
      delete row.isNew;
      delete row.isSaveInDb;
      if(typeof(grupoCodigoId) === 'number'){
        //se actualiza si el id es de type number
        dispatch(updateGrupoCodigo( row, grupoCodigoId ));
      } else {
        //se crea si el id es de type string
        dispatch(createGrupoCodigo( row, beneficioId ));
      }
    } else {
      alert ('Faltan ingresar campos obligatorios');
    }
  };

  const columns = [
    { field: 'beneficioId', headerName: 'Beneficio', width: 200, type: 'singleSelect', 
      valueOptions: beneficios.map( beneficio => { 
        return { value: beneficio.id , label : `${beneficio.nombre}` }} ), 
      editable: true,
      valueFormatter: (params) => {
        // eslint-disable-next-line
        if (params.value == false) return '';
        const beneficio = beneficios.find( beneficio => beneficio.id === parseInt(params.value) );
        const valueFormatted = `${beneficio.nombre}`;
        return valueFormatted;
      }
    },
    { field: 'nombre', headerName: 'Nombre', width: 200, editable: true },
    { field: 'descripcion', headerName: 'Descripcion', width: 500, editable: true },
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
            Grupos de Codigos
          </Typography>
          <Button variant="contained"
            onClick={() => navigate(-1)}
            >
            Volver
          </Button>
        </Box>

        <DataGrid localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            columns: {
              columnVisibilityModel: {
                created_at: false,
              },
            },
          }}

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