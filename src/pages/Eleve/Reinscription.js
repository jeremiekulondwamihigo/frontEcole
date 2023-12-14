/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Autocomplete from 'Control/Autocomplete';
import SelectOption from 'Control/Select';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { AjouterInscrit } from 'Redux/Inscrit';
import DirectionSnackbar from 'Control/Message';

function Reinscription() {
  const option = useSelector((state) => state.option.option);
  const eleve = useSelector((state) => state.eleveinfo.eleve);
  const eleveInscrit = useSelector((state) => state.inscrit);
  const [optionSelect, setOptionSelect] = React.useState('');
  const [eleveSelect, setEleveSelect] = React.useState('');
  const [classeSelect, setClasseSelect] = React.useState('');
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const sendData = () => {
    const data = {
      codeOption: optionSelect ? optionSelect.codeOption : '',
      codeClasse: classeSelect ? classeSelect.codeClasse : '',
      codeEleve: eleveSelect ? eleveSelect.codeEleve : ''
    };
    console.log(data);
    dispatch(AjouterInscrit(data));
  };
  return (
    <Grid sx={{ width: '30rem', position: 'relative', heigth: '40rem' }}>
      {eleveInscrit.postInscrit === 'rejected' && (
        <DirectionSnackbar open={open} setOpen={setOpen} message={eleveInscrit.postInscritError} />
      )}
      {eleveInscrit.postInscrit === 'success' && <DirectionSnackbar open={open} setOpen={setOpen} message="Opération effectuée" />}
      <div style={{ marginBottom: '10px' }}>
        <Autocomplete value={eleveSelect} setValue={setEleveSelect} options={eleve} title="Cherchez un eleve" />
      </div>
      <div>
        {option && (
          <SelectOption option={option} value={optionSelect} setValue={setOptionSelect} title="Selectionnez l'option" recherche="option" />
        )}
      </div>
      <div>
        {optionSelect && (
          <div className="containerClasse">
            {optionSelect.classe.length > 0 &&
              optionSelect.classe.map((index) => {
                return (
                  <div key={index._id} onClick={() => setClasseSelect(index)}>
                    <p>
                      {index.niveau}
                      <sup>{index.niveau > 1 ? ' eme ' : ' ere '}</sup>
                      {index.indexe}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <Grid item xs={12}>
        <AnimateButton>
          <Button fullWidth onClick={() => sendData()} size="large" type="submit" variant="contained" color="primary">
            Inscrire
          </Button>
        </AnimateButton>
      </Grid>
    </Grid>
  );
}

export default Reinscription;
