import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ButtonMenu from '../../components/ButtonMenu';
import BasicTabs from '../../components/Tabs';
import Orders from './Orders';
import { getOrdenes } from '../../actions/ordenes';

function OrdenesContent() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrdenes());
      // eslint-disable-next-line
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

      <Box sx={{ mb:2, display: 'flex', justifyContent: 'space-between'}} >
        
        <Typography variant="h5" component="h5" >
          Beneficios
        </Typography>

        <Box sx={{ mb:2, display: 'flex', justifyContent: 'flex-end'}} >

          <Button sx={{ mr:2}}
            variant="contained"
            onClick={() => navigate('/panel/beneficios/ordenes')}
            >
            Ordenes
          </Button>
        
          <ButtonMenu
            actions={
              [
                { handleClick: () => navigate('beneficios'), icon: <EditIcon />, text: 'Beneficios' },
                { handleClick: () => navigate('gruposcodigos'), icon: <EditIcon />, text: 'Grupos de Codigos' },
                { handleClick: () => navigate('codigos'), icon: <EditIcon />, text: 'Codigos' },
                { handleClick: () => navigate('prestadores'), icon: <EditIcon />, text: 'Prestadores' },
              ]
            } 
          />
        </Box>
        
      </Box>

      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <BasicTabs 
              items={
                [
                  {text: 'Pañales', content: <Orders />},
                  {text: 'Leche', content: <Orders />},
                ]
              }
            />
          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
}

export default function Ordenes() {
  return <OrdenesContent />;
}