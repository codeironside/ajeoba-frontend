import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
    open,
    setOpen,
    confirmAction,
}) {

  const handleClose = () => {
    setOpen(false);
    };
    
    const handleConfirmAction = () => {
        confirmAction();
        setOpen(false);
    }

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please, confirm the document very well."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This is because any document uploaded cannot be changed once submitted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmAction}>Upload Confirmed</Button>
        </DialogActions>
      </Dialog>
  );
}