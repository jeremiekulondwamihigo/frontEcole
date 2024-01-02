/* eslint-disable react/prop-types */
import React from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { putEleve } from 'Redux/Inscrit';

function Derogation({ id, codeAgent }) {
  const [delais, setDelais] = React.useState('');
  const dispatch = useDispatch();
  const sendData = () => {
    const donner = {
      id,
      data: {
        derogation: {
          date: delais,
          codeAgent
        }
      },
      lien: 'eleveInscrit'
    };
    dispatch(putEleve(donner));
  };
  return (
    <div style={{ width: '15rem' }}>
      <TextField type="date" placeholder="Date" fullWidth onChange={(e) => setDelais(e.target.value)} />
      <Grid sx={{ marginTop: '15px' }}>
        <Button variant="contained" color="secondary" fullWidth onClick={() => sendData()}>
          Accorder
        </Button>
      </Grid>
    </div>
  );
}

export default Derogation;
