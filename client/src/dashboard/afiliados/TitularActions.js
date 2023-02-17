import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Check from '@mui/icons-material/Check';
import Save from '@mui/icons-material/Save';
import FamilyRestroom from '@mui/icons-material/FamilyRestroom';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { green } from '@mui/material/colors';
import Dialog from '../../components/Dialog';

import { updateAfiliadoTitular, getAfiliados, deleteTitular } from '../../actions/titulares';

const TitularActions = ({ params, rowId, setRowId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const updatedFields = params.row;
    const titularId = updatedFields.id;
    delete updatedFields.id;
  
    const result = await updateAfiliadoTitular( updatedFields, titularId, dispatch);
    if (result) {
      setSuccess(true);
      setRowId(null);
      dispatch(getAfiliados());
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
      // eslint-disable-next-line
  }, [rowId]);

  return (
    <Box sx={{ m: 1, position: 'relative'}} >
      {success ? (
        <Fab color="primary" sx={{ width: 40, height: 40, bgcolor: green[500], '&:hover': { bgcolor: green[700] } }}>
          <Check />
        </Fab> ) : (
        <Fab color="primary" sx={{ width: 40, height: 40 }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit} >
          <Save />
        </Fab> )
      }
      {loading && (
        <CircularProgress size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
      <Fab sx={{ width: 40, height: 40, ml:1 }} onClick={() => navigate(`/panel/participantes/${params.row.id}`)}>
        <FamilyRestroom />
      </Fab>
      <Fab sx={{ width: 40, height: 40, ml:1 }} onClick={() => navigate(`/panel/beneficios/ordenes/nueva?titularId=${params.row.id}`)}>
        <VolunteerActivismIcon />
      </Fab>
      <Fab sx={{ width: 40, height: 40, ml:1 }} onClick={() => setOpenDialog(true)}>
        <RemoveCircleIcon />
      </Fab>

      <Dialog
        open={openDialog}
        handleClose={ () => setOpenDialog(false) }
        title={'Confirmar Eliminación'}
        content={`${params.row.apellidos}, ${params.row.nombres} desaparecera de esta lista, pero lo podrá recuperar mas tarde.`}
        actions={ [{ handleClick: ()=> alert(params.row.id), textButton:'Eliminar' }] }
      />

    </Box>
  );
};

export default TitularActions;