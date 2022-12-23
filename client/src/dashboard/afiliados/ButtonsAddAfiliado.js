import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function ButtonsAddAfiliado({ createdAfiliadoTitular, handleSubmit, loading }) {
  const navigate = useNavigate();
  return (
    <>
      { createdAfiliadoTitular.length? 
        <>
          <Button
            // onClick={}
            variant="contained"
            sx={{ m:2}}
            >
            Añadir Participantes
          </Button>
          <Button
            // onClick={() => setValues(initialValues)}
            variant="contained"
            sx={{ m:2 }}
            >
            Registrar otro Titular
          </Button>
        </>
        :
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ m:2 }}
          disabled={loading}
          >
          Dar de Alta
        </Button>
      }

      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{ m:2 }}
        >
        Volver
      </Button>
    </>
  );
};