import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import AutoComplementRecherche from 'Control/AutoCompleteRecherche';
import { Add } from '@mui/icons-material';
import { get, post } from 'utils/Liens';
import { dateFrancais } from 'utils/Utils';
import './style.css';
import Recu from './Recu';

// eslint-disable-next-line react/prop-types
const Enregistrement = ({ eleve, anneeSelect, codeAgent }) => {
  const annees = useSelector((state) => state.annee.annee);
  const echeances = useSelector((state) => state.title.title);
  const [title, setTitle] = React.useState();
  const [trancheClasse, setTrancheClasse] = React.useState();
  const [titleSelect, setTitleSelect] = React.useState('');
  const [payementEleve, setPayement] = React.useState([]);
  const [montant, setMontant] = React.useState('');

  const loadingEcheance = () => {
    let annee = _.filter(annees, { active: true });
    let echean = _.filter(echeances, { codeAnnee: annee[0]?.codeAnnee });
    setTitle(echean);
  };
  React.useEffect(() => {
    loadingEcheance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annees]);
  // eslint-disable-next-line prettier/prettier
  const loadingTitleFraisNvide = () => {
    // eslint-disable-next-line react/prop-types
    let titres = title?.map((x) => (_.filter(x.frais, { codeClasse: eleve.codeClasse }).length > 0 ? x : null));
    setTrancheClasse(titres?.filter((x) => x !== null));
  };
  React.useEffect(() => {
    loadingTitleFraisNvide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleve, title]);

  const loadingPayement = async () => {
    // eslint-disable-next-line react/prop-types
    const response = await get(`onePayement/${eleve.codeEleve}/${anneeSelect.codeAnnee}`);
    setPayement(response.data);
  };
  // eslint-disable-next-line prettier/prettier
  React.useEffect(() => {
    loadingPayement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleve, anneeSelect]);

  const sendPayement = async (e) => {
    e.preventDefault();
    const data = {
      montant,
      codeTitle: titleSelect.codeTitle,
      // eslint-disable-next-line react/prop-types
      codeEleve: eleve.codeEleve,
      // eslint-disable-next-line react/prop-types
      codeAnnee: anneeSelect.codeAnnee,
      codeAgent
    };
    // eslint-disable-next-line prettier/prettier
    const response = await post('payement', data);
    if (response.data.length > 0 && response.status === 200) {
      setPayement(response.data);
    }
  };
  return (
    <Grid>
      <Grid container>
        <Grid item lg={4}>
          <AutoComplementRecherche
            value={titleSelect}
            setValue={setTitleSelect}
            options={trancheClasse}
            recherche="title"
            title="Selectionnez le frais"
          />
        </Grid>
        <Grid item lg={4} sx={{ padding: '5px' }}>
          <TextField placeholder="Montant" type="number" fullWidth onChange={(e) => setMontant(e.target.value)} />
        </Grid>
        <Grid sx={{ padding: '5px' }} item lg={4}>
          <Button color="primary" variant="contained" onClick={(e) => sendPayement(e)}>
            <Add fontSize="small" /> <span>Enregistrer</span>
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12}>
          {payementEleve && (
            <table>
              <thead>
                <tr>
                  <td>Facture n°</td>
                  <td>Date/Heure</td>
                  <td>Titre</td>
                  <td>Montant payé</td>
                  <td>Reste à payé</td>
                  <td>Imprimer</td>
                </tr>
              </thead>
              <tbody>
                {payementEleve.map((index) => {
                  return (
                    <tr key={index._id}>
                      <td>{index.id}</td>
                      <td>
                        {dateFrancais(index.createdAt)} à{' '}
                        {`${new Date(index.createdAt).getHours()}:${new Date(index.createdAt).getMinutes()}`}
                      </td>
                      <td>{index.titre}</td>
                      <td>{index.montant}$</td>
                      <td>{index.reste}$</td>
                      <td>
                        <Recu data={index} eleve={eleve} />
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Enregistrement;
