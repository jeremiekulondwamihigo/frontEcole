import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Option = Loadable(lazy(() => import('pages/Option')));
const AnneeScolaire = Loadable(lazy(() => import('pages/AnneeScolaire')));
const Classe = Loadable(lazy(() => import('pages/Classe')));

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
    },
    {
      path: '/classe/:id',
      element: <Classe />
    }
  ]
};

export default MainRoutes;
