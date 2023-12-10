// import AddCours from './AddCours';
import { Grid, Fab } from '@mui/material';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useContext, useState } from 'react';
import { CreateContexte } from 'Context';
import AddCours from './AddCours';
import Popup from 'Control/Modal';

import './style.css';
function Index() {
  const [open, setOpen] = useState(false);
  const { showDataClasseSelect } = useContext(CreateContexte);
  const coursclasse = useSelector((state) => _.filter(state.cours.cours, { codeClasse: showDataClasseSelect }));
  const [coursselect, setCoursSelect] = useState();
  return (
    <>
      <Grid>
        <table id="tableau">
          <thead>
            <tr>
              <td onClick={() => setOpen(true)}>
                Cours{' '}
                <Fab size="small" color="primary">
                  A
                </Fab>
              </td>
            </tr>
          </thead>
          <tbody>
            {coursclasse &&
              coursclasse.map((index) => {
                return (
                  <tr
                    key={index._id}
                    onClick={() => setCoursSelect(index)}
                    className={`${coursselect && coursselect.idCours === index.idCours ? 'select' : ''}`}
                  >
                    <td>{index.branche}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* <AddCours /> */}
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Ajoutez un cours">
        <AddCours />
      </Popup>
    </>
  );
}
export default Index;
