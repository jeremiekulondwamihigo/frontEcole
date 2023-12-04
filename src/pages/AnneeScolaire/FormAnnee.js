import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonLoading from 'Control/Button';
import { useDispatch } from 'react-redux';
import { AjouterAnnee } from 'Redux/Annee';

export default function BasicTextFields() {
  const [annee, setValeur] = React.useState('');
  const dispactch = useDispatch();
  const sendData = async () => {
    dispactch(AjouterAnnee(annee));
  };
  return (
    <Box
      component="form"
      sx={{
        width: '20rem'
      }}
      noValidate
      autoComplete="on"
    >
      <TextField
        value={annee}
        onChange={(e) => setValeur(e.target.value)}
        id="idLabel"
        label="Année scolaire"
        variant="outlined"
        fullWidth
      />
      <ButtonLoading loading={false} fonction={sendData} title="Enregistrer" />
    </Box>
  );
}
