/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import AutoComplementRecherche from 'Control/AutoCompleteRecherche';
import { TextField, Button, Checkbox, FormControl, Box, FormGroup, FormControlLabel } from '@mui/material';
import { AddRecouvrements, UpdateRecouvrementSet } from 'Redux/SetRecouvrement';
import DirectionSnackbar from 'Control/Message';

function Form({ donner }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const title = useSelector((state) => state.title?.title);
  const anneeActive = useSelector((state) => _.filter(state.annee?.annee, { active: true }));
  const [titre, setTitre] = React.useState([]);
  const [titleSelect, setTitleSelect] = React.useState('');
  const [pourcentage, setPourcentage] = React.useState('');
  const [status, setStatus] = React.useState(true);
  const frais = useSelector((state) => state.recouvrement);

  const loading = () => {
    let titleFilter = _.filter(title, { codeAnnee: anneeActive[0]?.codeAnnee });
    setTitre(titleFilter);
  };
  React.useEffect(() => {
    loading();
  }, [anneeActive]);
  const sendData = (e) => {
    e.preventDefault();
    let data = { codeTitle: titleSelect.codeTitle, pourcentage };
    dispatch(AddRecouvrements(data));
  };

  React.useEffect(() => {
    if (donner) {
      setTitleSelect(donner.title);
      setPourcentage(donner.pourcentage);
      setStatus(donner.active);
    }
  }, [donner]);

  const updateRecou = () => {
    let data = {
      id: donner._id,
      pourcentage,
      active: status
    };
    dispatch(UpdateRecouvrementSet(data));
  };

  return (
    <div style={{ width: '25rem', marginTop: '10px' }}>
      {frais.addRecouvrement === 'success' && <DirectionSnackbar message="Opération effectuée" open={open} setOpen={setOpen} />}
      {frais.addRecouvrement === 'rejected' && <DirectionSnackbar message={frais.addRecouvrementError} open={open} setOpen={setOpen} />}
      {frais.updateRecouvrement === 'rejected' && <DirectionSnackbar message={frais.updateRecouvrementError} open={open} setOpen={setOpen} />}
      {frais.updateRecouvrement === 'success' && <DirectionSnackbar message="Opération effectuée" open={open} setOpen={setOpen} />}

      {titre && (
        <AutoComplementRecherche
          value={titleSelect}
          setValue={setTitleSelect}
          options={titre}
          recherche="title"
          title="Selectionnez le frais"
        />
      )}
      <div style={{ marginTop: '10px' }}>
        <TextField
          onChange={(e) => setPourcentage(e.target.value)}
          id="outlined-basic"
          fullWidth
          value={pourcentage}
          label="Entrez le pourcentage à reduire sur le 100% à recouvrer"
          variant="outlined"
        />
      </div>
      <div>
        <Box sx={{ display: 'flex' }}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel onClick={() => setStatus(true)} control={<Checkbox checked={status} name="status" />} label="Activer" />
            </FormGroup>
          </FormControl>
          <FormControl required component="fieldset" sx={{ m: 3 }} variant="standard">
            <FormGroup>
              <FormControlLabel
                onClick={() => setStatus(false)}
                control={<Checkbox checked={!status} name="status" />}
                label="Désactiver"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button fullWidth variant="contained" onClick={donner ? (e) => updateRecou(e) : (e) => sendData(e)}>
          {donner ? 'Modifiez' : 'Confirmez'}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Form);
