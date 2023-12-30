import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import Enregistrement from './Enregistrement.js';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import AutoComplementEleveInscrit from 'Control/AutoCompleteEleveInscrit.jsx';
import MainCard from 'components/MainCard.js';
import Images from 'pages/Image/Images.jsx';
import Select from 'Control/Select.jsx';

function Index() {
  const inscrit = useSelector((state) => state.inscrit.inscrit);
  const annee = useSelector((state) => state.annee.annee);
  const [data, setData] = React.useState();
  const [value, setValue] = React.useState('');
  const [anneeSelect, setAnneeSelect] = React.useState('');
  const [codeAgent, setCodeAgent] = React.useState('');

  const loading = () => {
    let annees = _.filter(annee, { active: true });
    setAnneeSelect(annees[0]);
  };
  React.useEffect(() => {
    loading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annee]);
  React.useEffect(() => {
    if (anneeSelect) {
      let donner = _.filter(inscrit, { codeAnnee: anneeSelect.codeAnnee });
      setData(donner);
      setValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anneeSelect]);

  return (
    <MainCard>
      <Grid container>
        <Grid item lg={4}>
          <Grid sx={{ mb: '10px' }}>
            <Grid sx={{ mb: '10px' }}>
              {annee && <Select option={annee} value={anneeSelect} setValue={setAnneeSelect} title="Année scolaire" recherche="annee" />}
            </Grid>
            <Grid sx={{ mb: '10px' }}>
              <TextField placeholder="code Agent" fullWidth onChange={(e) => setCodeAgent(e.target.value)} />
            </Grid>
            {data && <AutoComplementEleveInscrit value={value} setValue={setValue} options={data} title="Selectionnez l'élève" />}
          </Grid>
          {value && (
            <Grid>
              <Images src={value.eleve.filename} />
              <Typography noWrap>{value.eleve.nom + ' ' + value.eleve.postnom + ' ' + value.eleve.prenom}</Typography>
              <Typography>
                Classe : {value.classe.niveau}
                <sup>e</sup>
                {value.classe.indexe}
              </Typography>
              <Typography noWrap>Option : {value.option.option}</Typography>
              <Typography noWrap>Réf : {value.ref}</Typography>
              <Typography noWrap>code Eleve : {value.codeEleve}</Typography>
              <Typography noWrap>Année scolaire : {value.annee.annee}</Typography>
              {value.resultat > 0 && <Typography>Réf : {value.resultat + '%'}</Typography>}
            </Grid>
          )}
        </Grid>
        <Grid item lg={8}>
          {value && anneeSelect && <Enregistrement eleve={value} codeAgent={codeAgent} anneeSelect={anneeSelect} />}
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default Index;
