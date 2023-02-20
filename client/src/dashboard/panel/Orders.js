import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/Title';

const rows = [

];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <>
      <Title>Ultimas Ordenes de Pañales</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Afiliado</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Entrega N°</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.shipTo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </>
  );
}