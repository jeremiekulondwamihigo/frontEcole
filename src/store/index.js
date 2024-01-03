// third-party
import { configureStore } from '@reduxjs/toolkit';
import { readAllYear } from 'Redux/Annee';
import { readUser } from 'Redux/User';
import { getOption } from 'Redux/Option';

// project import
import reducers from './reducers';
import { readCours } from 'Redux/Cours';
import { readEleve } from 'Redux/EleveInf';
import { readInscrit } from 'Redux/Inscrit';
import { readParent } from 'Redux/Parent';
import { ReadTitle } from 'Redux/TitleFrais';
import { readRecouvrements } from 'Redux/SetRecouvrement';
import { readClasses } from 'Redux/ClasseAll';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers
});

const { dispatch } = store;
dispatch(readUser());
dispatch(readAllYear());
dispatch(getOption());
dispatch(readCours());
dispatch(readEleve());
dispatch(readInscrit());
dispatch(readParent());
dispatch(ReadTitle());
dispatch(readRecouvrements());
dispatch(readClasses());

export { store, dispatch };
