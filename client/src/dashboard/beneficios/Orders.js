import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/Title';

import { recentOrdersPanales } from '../../actions/ordenes';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  const dispatch = useDispatch();
  const recentOrders = useSelector ( state => state.recentOrdersPanales);

  useEffect( () => {
    dispatch(recentOrdersPanales())
  }, [dispatch]);

  return (
    <>
      <Title>Ultimas Ordenes de Pañales</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Afiliado</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell align="center">Entrega</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.dataTitular.apellidos}, {order.dataTitular.nombres}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell align="center">{order.dataCodigos.entrega}</TableCell>
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