/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import { CreateContexte } from 'Context';
import { memo, useContext } from 'react';
import TabComponent from 'Control/Tab';
import TableEleve from 'pages/Eleve/TableEleve';
import Titeur from './Titeur';
import FicheCotation from './FicheCotation';

function Affichage() {
  const { showDataClasseSelect } = useContext(CreateContexte);
  let titre = [
    { id: 0, label: 'Eleves' },
    { id: 1, label: 'Titulaire' },
    { id: 2, label: 'Fiche de cotation' }
  ];
  let components = [
    { id: 0, component: <TableEleve classe={showDataClasseSelect} /> },
    { id: 1, component: <Titeur /> },
    { id: 2, component: <FicheCotation /> }
  ];
  return (
    <Grid container spacing={1}>
      <TabComponent titres={titre} components={components} />
    </Grid>
  );
}
export default memo(Affichage);
