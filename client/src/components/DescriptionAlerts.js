import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts({message, title, severity}) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={severity || 'error'}>
        <AlertTitle>{title || 'Error'}</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
}