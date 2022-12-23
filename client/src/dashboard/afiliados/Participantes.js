import React from 'react';
import { useState } from 'react';
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
import { grey } from '@mui/material/colors';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, gridClasses, esES } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';

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
      isNew: true 
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
  
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  
  const [pageSize, setPageSize] = useState(5);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

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

  const processRowUpdate = (newRow) => {
    
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
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
    { field: 'actions', headerName: 'Acciones', width: 125, type: 'actions', cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Register"
            onClick={()=> alert('Se va a guardar')}
            color="inherit"
          />,
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