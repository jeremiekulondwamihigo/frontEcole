// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import annee from 'Redux/Annee';
import user from 'Redux/User';
import option from 'Redux/Option';
import cours from 'Redux/Cours';
import eleveinfo from 'Redux/EleveInf';
import inscrit from 'Redux/Inscrit';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, annee, user, option, cours, eleveinfo, inscrit });

export default reducers;
