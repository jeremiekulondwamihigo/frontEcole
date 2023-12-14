import React from 'react';
import Popup from 'Control/Modal';
import Formulaire from './Formulaire';
import { Fab, Grid } from '@mui/material';
import { AppstoreAddOutlined } from '@ant-design/icons';

function Index() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Grid>
        <Fab size="small" color="primary" onClick={() => setOpen(true)}>
          <AppstoreAddOutlined />
        </Fab>
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Ajoutez un parent">
        <Formulaire />
      </Popup>
    </>
  );
}

export default Index;
