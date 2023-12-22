import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page

// render - utilities
const Eleves = Loadable(lazy(() => import('pages/Eleve')));
const Echeance = Loadable(lazy(() => import('pages/Echeance')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'eleve',
      element: <Eleves />
    },
    {
      path: 'echeance',
      element: <Echeance />
    }
  ]
};

export default MainRoutes;
