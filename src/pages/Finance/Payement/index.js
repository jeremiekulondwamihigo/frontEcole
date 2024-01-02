import React from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';
import Enregistrement from './Enregistrement.js';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import AutoComplementEleveInscrit from 'Control/AutoCompleteEleveInscrit.jsx';
import MainCard from 'components/MainCard.js';
import Images from 'pages/Image/Images.jsx';
import Select from 'Control/Select.jsx';
import Derogation from './Derogation.js';
import Popup from 'Control/Modal.jsx';
import { dateFrancais } from 'utils/Utils.js';
import { Clear } from '@mui/icons-material';

function Index() {
  const inscrit = useSelector((state) => state.inscrit.inscrit);
  const annee = useSelector((state) => state.annee.annee);
  const [data, setData] = React.useState();
  const [value, setValue] = React.useState('');
  const [anneeSelect, setAnneeSelect] = React.useState('');
  const [codeAgent, setCodeAgent] = React.useState('');
  const [open, setOpen] = React.useState(false);

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
            <Grid sx={{ textAlign: 'center' }}>
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
              {value.derogation && (
                <Typography sx={value?.derogation?.active === false && style.red}>
                  Dérogation jusqu&apos;au : {dateFrancais(value.derogation.date)}
                  {value.derogation?.active && <Clear color="red" fontSize="small" />}
                </Typography>
              )}
              {value.resultat > 0 && <Typography>Réf : {value.resultat + '%'}</Typography>}
            </Grid>
          )}
          <Grid container>
            <Grid item lg={6}>
              <Button variant="contained" color="primary" fullWidth>
                Palmares
              </Button>
            </Grid>
            <Grid item lg={6} sx={{ paddingLeft: '5px' }}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => setOpen(true)}>
                Dérogation
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={8} sx={{ paddingLeft: '10px' }}>
          {value && anneeSelect && <Enregistrement eleve={value} codeAgent={codeAgent} anneeSelect={anneeSelect} />}
        </Grid>
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Accordez une dérogation">
        {value && codeAgent && <Derogation id={value._id} codeAgent={codeAgent} />}
      </Popup>
    </MainCard>
  );
}

const style = {
  red: {
    color: 'red'
  }
};
export default Index;
