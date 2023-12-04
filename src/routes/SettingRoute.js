import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Option = Loadable(lazy(() => import('pages/Option')));
const AnneeScolaire = Loadable(lazy(() => import('pages/AnneeScolaire')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/option',
      element: <Option />
    },
    {
      path: '/annee',
      element: <AnneeScolaire />
    }
  ]
};

export default MainRoutes;
