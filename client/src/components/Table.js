import React from 'react';
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Orders({title, head, body}) {

  return (
    <>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {
              head.map( element => <TableCell>{element}</TableCell> )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            body.map( (row, index) => (
              <TableRow key={index}>
                { row.map( field => <TableCell>{field}</TableCell> ) }
              </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </>
  );
}