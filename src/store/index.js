// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import { readAllYear } from 'Redux/Annee';
import { readUser } from 'Redux/User';
import { getOption } from 'Redux/Option';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers
});

const { dispatch } = store;
dispatch(readAllYear());
dispatch(readUser());
dispatch(getOption());

export { store, dispatch };
