/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';

function Affichage({ classe }) {
  return (
    <Grid container spacing={1}>
      Affichage {classe}
    </Grid>
  );
}
export default Affichage;
