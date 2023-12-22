/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import Message from 'Control/Message';
import TabComponent from 'Control/Tab';
import BrancheMax from './BrancheMax';
import EnseignentValide from './EnseignentValide';

// project import

// assets

// ============================|| FIREBASE - LOGIN ||============================ //
// codeClasse,
//         id,
//         branche,
//         maxima,

const AddCours = (props) => {
  const { cour } = props;
  const [open, setOpen] = useState(true);
  const coursclasse = useSelector((state) => state.cours);
  // value, setValue, options, title
  return (
    <>
      {coursclasse.addcours === 'success' && <Message message="Enregistrement effectuer" open={open} setOpen={setOpen} />}
      {coursclasse.updatecours === 'success' && <Message message="Modification effectuée" open={open} setOpen={setOpen} />}
      {coursclasse.updatecours === 'rejected' && <Message message={coursclasse.updatecoursError} open={open} setOpen={setOpen} />}
      {coursclasse.addcours === 'rejected' && <Message message={coursclasse.addcoursError} open={open} setOpen={setOpen} />}
      <TabComponent
        titres={[
          { id: 0, label: 'Branche & Max' },
          { id: 1, label: 'Enseignant et Examen' }
        ]}
        components={[
          {
            id: 0,
            component: <BrancheMax cour={cour} />
          },
          {
            id: 1,
            component: <EnseignentValide cour={cour} />
          }
        ]}
      />
    </>
  );
};

export default memo(AddCours);
