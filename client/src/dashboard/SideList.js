import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SavingsIcon from '@mui/icons-material/Savings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import Divider from '@mui/material/Divider';

function SideListContent( {open, setOpen} ) {
  const navigate = useNavigate();

  return (
    <List>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/panel')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Panel" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/panel/titulares')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Afiliados" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/panel/empleadores')}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Empleadores" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/panel/beneficios')} >
          <ListItemIcon>
            <VolunteerActivismIcon />
          </ListItemIcon>
          <ListItemText primary="Beneficios" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/panel/recaudacion')}>
          <ListItemIcon>
            <SavingsIcon />
          </ListItemIcon>
          <ListItemText primary="Recaudación" />
        </ListItemButton>
      </ListItem>

      <Divider sx={{ my: 1 }} />

      <ListSubheader component="div" inset>
        Reportes Guardados
      </ListSubheader>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/panel/titulares')}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Current month" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/panel/titulares')}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Last quarter" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={() => navigate('/panel/titulares')}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Year-end sale" />
        </ListItemButton>
      </ListItem>

    </List>
  );
};

export default function SideList() {
  return <SideListContent />;
}