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
import parents from 'Redux/Parent';
import title from 'Redux/TitleFrais';
import recouvrement from 'Redux/SetRecouvrement';
import classe from 'Redux/ClasseAll';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, title, annee, user, option, cours, eleveinfo, inscrit, parents, recouvrement, classe });

export default reducers;
