/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Typography, Stack, Checkbox, Button } from '@mui/material';

// third party

import AutoComplement from 'Control/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { updateCours } from 'Redux/Cours';

function EnseignentValide({ cour }) {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const [valideExamen, setValideExamen] = React.useState(true);
  const enseignant = useSelector((state) => state.parents.parent.filter((x) => x.status === 'enseignant'));

  const sendData = (e) => {
    e.preventDefault();
    const data = { id: cour._id, data: { idEnseignant: value ? value.code : '' } };
    dispatch(updateCours(data));
  };
  return (
    <>
      {enseignant.length > 0 && (
        <Grid item xs={12}>
          <Stack>
            <AutoComplement value={value} setValue={setValue} options={enseignant} title="Selectionnez un enseignant" />
          </Stack>
        </Grid>
      )}
      <Grid item xs={12}>
        <Grid sx={{ display: 'flex' }}>
          <Typography>
            {' '}
            Ce cours a l&apos;examen
            <Checkbox onClick={() => setValideExamen(true)} checked={valideExamen} />
          </Typography>
          <Typography>
            {' '}
            Y a pas l&apos;examen pour ce cours
            <Checkbox checked={!valideExamen} onClick={() => setValideExamen(false)} />
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        <Button color="primary" onClick={(e) => sendData(e)} variant="contained">
          Modifier
        </Button>
      </Grid>
    </>
  );
}

export default EnseignentValide;
