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
import { retourneOption, loadingClasse } from 'utils/Utils';

function Titeur() {
  const [value, setValue] = React.useState('');
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
    let datas = { idClasse: showDataClasseSelect, codeEnseignant: value.code };
    dispatch(putClasse(datas));
  };
  const loadingClasseTuteur = (id) => {
    let table = loadingClasse(option);
    let classAll = option.filter((x) => x.classe.length > 0);
    if (_.filter(table, { titulaire: id }).length > 0) {
      return (
        'classe : ' +
        _.filter(table, { titulaire: id })[0].niveau +
        'e ' +
        retourneOption(_.filter(classAll, { codeOption: _.filter(table, { titulaire: id })[0].codeOption })[0].option)
      );
    } else {
      return '';
    }
  };
  return (
    <Grid container>
      <Grid item lg={4}>
        {showDataClasseSelect ? (
          <>
            {enseignant.length > 0 &&
              enseignant.map((index) => {
                return (
                  <div key={index._id} onClick={() => setValue(index)} className="enseignantDiv">
                    <p className="enseignantNom">{index.nom}</p>
                    <p className="ensegnantStatus">
                      {loadingClasseTuteur(index.code)} Nbre de cours : {index.cours.length}
                    </p>
                  </div>
                );
              })}
          </>
        ) : (
          <p>Veuillez selectionner la classe</p>
        )}
      </Grid>
      {value && (
        <>
          <Grid item lg={8}>
            <div className="imageEnseignant">
              <div>
                <img onClick={() => openImages(value._id)} src={value.filename ? value.filename : person} alt="enseignant" />
                <div style={{ width: '90%' }}>
                  <Typography noWrap sx={{ textAlign: 'center' }}>
                    {value.nom}
                  </Typography>
                  <Typography noWrap sx={{ textAlign: 'center' }}>
                    code : {value.code}
                  </Typography>
                  <Typography noWrap sx={{ textAlign: 'center' }}>
                    contact : {value.telephone}
                  </Typography>
                </div>
                <div>
                  <Button color="primary" variant="contained" fullWidth onClick={(e) => sendData(e)}>
                    Confirmer
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Titeur;
