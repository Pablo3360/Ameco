import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
//import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import SideList from './SideList';
import PanelGeneral from "./panel/Default";
import Titulares from "./afiliados/Titulares";
import AltaTitular from "./afiliados/AltaTitular";
import EstadisticasTitulares from "./afiliados/estadisticas/Estadisticas";
import Participantes from "./afiliados/Participantes";
import Recaudadores from "./recaudacion/Recaudadores";
import Empleadores from "./empleadores/Empleadores";
import BeneficiosDefault from "./beneficios/Default";
import OrdenesBeneficios from "./beneficios/ordenes/Ordenes";
import Prestadores from './beneficios/Prestadores';
import Beneficios from './beneficios/Beneficios';
import GruposCodigos from './beneficios/GruposCodigos';
import Codigos from './beneficios/Codigos';
import NuevaOrden from './beneficios/ordenes/NuevaOrden';
import Orden from './beneficios/ordenes/Orden';
import Copyright from "./Copyright";

import { UserResponse } from '../actions/login';
import { Error } from '../actions/error';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const mdTheme = createTheme();

function DashboardContent() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => { setOpen(!open) };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(UserResponse(null));
  };

  //Al cerrar Sesion, limpia el estado global -> Error
  useEffect( () => {
    return () => dispatch(Error({}));
  }, [dispatch]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>

        <CssBaseline />

        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={ {marginRight: '36px', ...(open && { display: 'none' }) }}
              >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              AMECO
            </Typography>

            <div>
              <IconButton
                size="large"
                aria-label="logout user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleLogout}>Cerrar Sesi??n</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>

          <Toolbar
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}
            >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />

          <SideList open={open} setOpen={setOpen} />

        </Drawer>

        <Box component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
          >
          <Toolbar />
          
          <Routes>
            <Route exact path='' element={<PanelGeneral />}/>
            <Route exact path='titulares' element={<Titulares />}/>
            <Route exact path='titulares/crear' element={<AltaTitular />}/>
            <Route exact path='titulares/estadisticas' element={<EstadisticasTitulares />}/>
            <Route exact path='participantes/:titularId' element={<Participantes />}/>
            <Route exact path='recaudacion' element={<Recaudadores />}/>
            <Route exact path='empleadores' element={<Empleadores />}/>
            <Route exact path='beneficios' element={<BeneficiosDefault />}/>
            <Route exact path='beneficios/prestadores' element={<Prestadores />}/>
            <Route exact path='beneficios/beneficios' element={<Beneficios />}/>
            <Route exact path='beneficios/ordenes' element={<OrdenesBeneficios />}/>
            <Route exact path='beneficios/gruposcodigos' element={<GruposCodigos />}/>
            <Route exact path='beneficios/codigos' element={<Codigos />}/>
            <Route exact path='beneficios/ordenes/nueva' element={<NuevaOrden />}/>
            <Route exact path='beneficios/ordenes/orden/:ordenId' element={<Orden />}/>
          </Routes>

          <DrawerHeader />
          <Copyright sx={{ pt: 4 }} />
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
