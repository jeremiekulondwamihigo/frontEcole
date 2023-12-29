/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button } from '@mui/material';
import _ from 'lodash';
// third party

import { CreateContexte } from 'Context';
import person from 'utils/person.png';
import { useNavigate } from 'react-router-dom';
import { putClasse } from 'Redux/Option';
import { loadingClasse } from 'utils/Utils';
import AutoComplement from 'Control/Autocomplete';
import Popup from 'Control/Modal';

function Titeur() {
  const [value, setValue] = React.useState('');
  const [valueChange, setValueChange] = React.useState('');
  const { showDataClasseSelect } = useContext(CreateContexte);
  const enseignant = useSelector((state) => state.parents.parent.filter((x) => x.status === 'enseignant'));
  const option = useSelector((state) => state.option.option);
  const navigation = useNavigate();
  const openImages = (id) => {
    navigation('/upload/' + id, { replace: true });
  };
  const dispatch = useDispatch();
  const sendData = (e) => {
    e.preventDefault();
    let datas = { idClasse: showDataClasseSelect, codeEnseignant: valueChange.code };
    dispatch(putClasse(datas));
  };
  const loadingClasseTuteur = () => {
    let table = loadingClasse(option);
    let classeSelect = _.filter(table, { codeClasse: showDataClasseSelect });
    if (classeSelect.length > 0) {
      setValue(_.filter(enseignant, { code: classeSelect[0].titulaire })[0]);
    }
  };
  React.useEffect(() => {
    loadingClasseTuteur();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDataClasseSelect, option]);
  const [open, setOpen] = React.useState(false);
  return (
    <Grid container>
      <Popup open={open} setOpen={setOpen} title="Modifier le titeur">
        <div style={{ width: '20rem' }}>
          <AutoComplement value={valueChange} setValue={setValueChange} options={enseignant} title="Selectionnez un enseignant" />
          <Button sx={{ marginTop: '10px' }} color="primary" variant="contained" fullWidth onClick={(e) => sendData(e)}>
            Enregistrer
          </Button>
        </div>
      </Popup>
      <Grid item lg={12} className="titulaireImage">
        <Grid className="titulaire">
          {value && <img onClick={() => openImages(value._id)} src={value.filename ? value.filename : person} alt="enseignant" />}

          <Grid>
            {value && (
              <>
                <Typography sx={{ textAlign: 'center' }} noWrap>
                  {value.nom}
                </Typography>
                <Typography sx={{ textAlign: 'center' }} noWrap>
                  code : {value.code}
                </Typography>
                <Typography sx={{ textAlign: 'center' }} noWrap>
                  contact : {value.telephone}
                </Typography>
              </>
            )}

            <Button color="warning" variant="contained" fullWidth onClick={() => setOpen(true)}>
              Modifiez le titulaire
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Titeur;
