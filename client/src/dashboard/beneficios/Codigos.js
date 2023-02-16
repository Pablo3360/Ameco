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
  createCodigo, 
  CodigoResponse, 
  getCodigosResponse, 
  updateCodigo, 
  getCodigos
} from '../../actions/codigos';

import { getGruposCodigos } from '../../actions/gruposCodigos';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { 
      id, 
      grupoCodigoId: '',
      codigo: '', 
      precio: '',
      descripcion: '',
      updateAt: '',
      isNew: true,
      isSaveInDb: false
    }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'grupoCodigoId' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
        Codigo
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function Codigos() {

  const navigate = useNavigate();
  const gruposCodigos = useSelector(state => state.gruposCodigos);
  const codigos = useSelector(state => state.codigos);
  const createdCodigo= useSelector(state => state.createdCodigo);
  const dispatch = useDispatch();
  
  const [rows, setRows] = useState([]); // Estado con todas las filas y sus datos
  const [rowModesModel, setRowModesModel] = useState({}); // Modo de la fila, Edit o View
  const [pageSize, setPageSize] = useState(5);

  // Al montar el componente, pedimos a DB todos los Codigos
  useEffect(() => {
    dispatch(getGruposCodigos());
    dispatch(getCodigos());
      // eslint-disable-next-line
  }, []);

  //Actualizamos el estado local 'rows' con los Codigos del estado global
  useEffect( ()=>{
    setRows( rows => [ 
      ...rows, 
      ...codigos.map( Codigo => { 
        return { ...Codigo, isNew: false, isSaveInDb: true}
      })
    ]);
  }, [codigos]);

  //Borramos los Codigos al desmontar el componente
  useEffect( ()=>{ 
    return ()=> { 
      dispatch( getCodigosResponse([]) );
      dispatch( CodigoResponse({}) );
    }
    // eslint-disable-next-line
  }, []);

  // Cuando se guarde un Codigo en la Db, al recibir la respuesta, lo guardamos en el estado local
  useEffect(() => {
    // console.log(rows);
    // console.log(createdCodigo);
    // porque createdCodigo.grupoCodigoId viene como string del server o db?
    const updatedRow = { ...createdCodigo, isNew: false, isSaveInDb: true };
    setRows(rows.map((row) => ((row.codigo === createdCodigo.codigo && row.grupoCodigoId === parseInt(createdCodigo.grupoCodigoId))? updatedRow : row))); 
    // eslint-disable-next-line
  }, [createdCodigo]);

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

  //Borrar Codigo cuando el usuario presiona "Basurero"
  const handleDeleteClick = (deleteRow) => () => {
    if(typeof(deleteRow.id) === 'string'){
      setRows(rows.filter((row) => row.id !== deleteRow.id));
    } else {
      alert('¿Esta seguro de querer Borrar el Codigo?');
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
    if(typeof(newRow.id) === 'number' && prevRow.codigo !== newRow.codigo){
      alert('No es posible modificar el Codigo de un Codigo');
      return prevRow;
    } else if(typeof(newRow.id) === 'number' && (prevRow.grupoCodigoId !== newRow.grupoCodigoId)){
      alert('No es posible modificar el Grupo de un Codigo');
      return prevRow;
    } else{
      const updatedRow = { ...newRow, isNew: false, isSaveInDb: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
  };

  // Cuando se presiona el Icon Guarda DB, se Valida y en caso de corresponder se lo guarda en la DB
  const handleSaveDb = (row) => () => {
    const { grupoCodigoId, codigo, precio } = row;
    if( grupoCodigoId && codigo && precio ){
      const codigoId = row.id;
      const grupoCodigoId = row.grupoCodigoId;
      delete row.id;
      delete row.createdAt;
      delete row.updateAt;
      delete row.isNew;
      delete row.isSaveInDb;
      if(typeof(codigoId) === 'number'){
        //se actualiza si el id es de type number
        dispatch(updateCodigo( row, codigoId ));
      } else {
        //se crea si el id es de type string
        //delete row.grupoCodigoId;
        dispatch(createCodigo( row, grupoCodigoId));
      }
    } else {
      alert ('Faltan ingresar campos obligatorios');
    }
  };

  const columns = [
    { field: 'grupoCodigoId', headerName: 'Grupo de Codigo', width: 200, type: 'singleSelect', 
      valueOptions: gruposCodigos.map( grupoCodigo => { 
        return { value: grupoCodigo.id , label : `${grupoCodigo.nombre}` }} ), 
      editable: true,
      valueFormatter: (params) => {
        // eslint-disable-next-line
        if (params.value === null || params.value === '') return '';
        const grupoCodigo = gruposCodigos.find( grupoCodigo => 
          grupoCodigo.id === parseInt(params.value) || grupoCodigo.id === parseInt(params.value.value)
        );
        const valueFormatted = `${grupoCodigo.nombre}`;
        return valueFormatted;
      }
    },
    { field: 'codigo', headerName: 'Codigo', width: 100, editable: true },
    { field: 'precio', headerName: 'Precio', width: 75, editable: true },
    { field: 'descripcion', headerName: 'Descripcion', width: 350, editable: true },
    { field: 'updateAt', headerName: 'Actualizado', width: 150, editable: false },
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
            Codigos
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
                updateAt: false
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