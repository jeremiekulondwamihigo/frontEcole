import MainCard from 'components/MainCard';
import React from 'react';
import { Grid, Button } from '@mui/material';
import ListeTitle from './ListeTitle';
import './style.css';
import Popup from 'Control/Modal';
import AddTitle from './AddTitle';
import { useSelector } from 'react-redux';
import AddFrais from './AddFrais';
import { retourneOption } from 'utils/Utils';
import TabComponent from 'Control/Tab';
import Echeance from './Echeance';

function Index() {
  const [open, setOpen] = React.useState(false);
  const option = useSelector((state) => state.option.option);
  const classes = option?.filter((x) => x.classe.length > 0);
  const [title, setTitleSelect] = React.useState();
  return (
    <MainCard>
      <TabComponent
        titres={[
          { id: 0, label: 'Form frais' },
          { id: 1, label: 'Echeance' }
        ]}
        components={[
          {
            id: 0,
            component: (
              <Grid container>
                <Grid item lg={4}>
                  <Button onClick={() => setOpen(true)} sx={{ marginBottom: '10px' }} color="primary" variant="contained" fullWidth>
                    Ajouter
                  </Button>
                  <ListeTitle setTitleSelect={setTitleSelect} titre={title} />
                </Grid>
                <Grid item lg={8} sx={{ paddingLeft: '10px' }}>
                  {classes &&
                    classes.map((index) => {
                      return (
                        <div key={index._id} className="divOption">
                          <p className="pOption">{index.option}</p>
                          {index.classe.map((item) => {
                            return (
                              <div key={item._id} className="divNiveau">
                                <p className="pNiveau">
                                  {item.niveau}
                                  <sup>e</sup>
                                  {retourneOption(index.option)} &{item.indexe}
                                </p>{' '}
                                {title && <AddFrais idClasse={item.codeClasse} idTitle={title} />}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </Grid>
              </Grid>
            )
          },
          { id: 1, component: <Echeance /> }
        ]}
      />

      <Popup open={open} setOpen={setOpen} title="Ajoutez un frais à recouvrer">
        <AddTitle />
      </Popup>
    </MainCard>
  );
}
export default Index;
