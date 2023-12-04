// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import annee from 'Redux/Annee';
import user from 'Redux/User';
import option from 'Redux/Option';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, annee, user, option });

export default reducers;
