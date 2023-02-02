import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Title from './Title';

export default function Deposits() {
  const navigate = useNavigate();
  return (
    <>
      <Title>Configuraciones</Title>
      <Button onClick={() => navigate('beneficios')}>
        Beneficios
      </Button>
      <Button onClick={() => navigate('gruposcodigos')}>
        Grupos de Codigos
      </Button>
      <Button onClick={() => navigate('codigos')}>
        Codigos
      </Button>
      <Button onClick={() => navigate('prestadores')}>
        Prestadores
      </Button>
      <Button onClick={() => navigate('ordenes')}>
        Ordenes
      </Button>
    </>
  );
}
