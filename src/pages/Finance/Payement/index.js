import React from 'react';
import { Grid } from "@mui/material"
import Enregistrement from "./Enregistrement.js"

function Index() {
  return <Grid contained>
    <Grid item lg={4}>

    </Grid>
    <Grid item lg={8}>
      <Enregistrement />
    </Grid>

  </Grid>;
}

export default Index;
