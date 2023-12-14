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

export { store, dispatch };
