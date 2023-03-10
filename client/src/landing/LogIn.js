import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../dashboard/Copyright';
import DescriptionAlerts from '../components/DescriptionAlerts';
import { LogIn } from '../actions/login';
import { Error } from '../actions/error';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function LogInContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const user = useSelector( state => state.user);
  const error = useSelector( state => state.error);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    dispatch(LogIn({
      mail: data.get('mail'),
      password: data.get('password'),
    }));
  };

  useEffect( ()=> {
    if(user.token) navigate('/panel');
  }, [user, navigate]);

  useEffect( ()=> {
    setLoading(false);
  }, [error]);

  useEffect( ()=> {
    return () => dispatch(Error({}));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar a AMECO
          </Typography>
          {error.message && (<DescriptionAlerts message={error.message} />)}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="mail"
              label="Email"
              name="mail"
              autoComplete="mail"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contrase??a"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              >
              Ingresar
            </Button>
          </Box>
          <DescriptionAlerts sx={{ m: 1}}
            severity='info'
            title='??Mira la App por dentro!'
            message='mail: juanperez@gmail.com - password: juanperez2000'
          />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}