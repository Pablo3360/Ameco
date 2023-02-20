import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, handleClose, title, content, actions }) {

  return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			>
			<DialogTitle id="alert-dialog-title">
				{title}
			</DialogTitle>

			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{content}
				</DialogContentText>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
				{ actions.map( (action, index) => <Button key={index} onClick={action.handleClick}>{action.textButton}</Button> ) }
			</DialogActions>
		</Dialog>
  );
}