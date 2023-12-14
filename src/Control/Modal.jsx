/* eslint-disable react/prop-types */
import * as React from 'react';
import { Dialog, Typography, DialogTitle, DialogContent } from '@mui/material';
import Slide from '@mui/material/Slide';
import { CloseOutlined } from '@ant-design/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup({ open, children, setOpen, title }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '12px' }} component="p">
            {title}
          </Typography>
          <CloseOutlined fontSize="small" color="secondary" style={{ cursor: 'pointer' }} onClick={() => setOpen(false)} />
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
export default Popup;
