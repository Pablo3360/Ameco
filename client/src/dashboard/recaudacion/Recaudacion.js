import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, esES } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator'; //Consultar ultimo ID en DB

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
        Afiliado Titular
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function Recaudacion() {
  
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
    { field: 'apellidos', headerName: 'Apellidos', editable: true },
    { field: 'nombres', headerName: 'Nombres', editable: true },
    { field: 'dni', headerName: 'DNI', hideable: false, width: 85, editable: true },
    { field: 'sexo', headerName: 'Sexo', width: 85, type: 'singleSelect', 
    valueOptions: ['varon', 'mujer', 'sin especificar'], editable: true},
    { field: 'estado_civil', headerName: 'Estado Civil', type: 'singleSelect', 
    valueOptions: ['casado/a', 'soltero/a', 'union de hecho', 'sin especificar'], editable: true },
    { field: 'nacimiento', headerName: 'Nacimiento', type: 'date', editable: true },
    { field: 'localidad', headerName: 'Localidad', width: 85, editable: true},
    { field: 'domicilio', headerName: 'Domicilio', width: 100, editable: true },
    { field: 'celular', headerName: 'Celular', editable: true },
    { field: 'tipo', headerName: 'Tipo', width: 85, type: 'singleSelect', 
      valueOptions: ['activo', 'adherente'], editable: true},
    {
      field: 'actions', headerName: 'Acciones', width: 115, type: 'actions', cellClassName: 'actions',
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
    <Box sx={{ height: 500, width: '100%', '& .actions': { color: 'text.secondary'}, '& .textPrimary': { color: 'text.primary'} }}>
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
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel }
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}