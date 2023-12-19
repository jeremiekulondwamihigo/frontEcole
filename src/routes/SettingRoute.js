import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Option = Loadable(lazy(() => import('pages/Option')));
const AnneeScolaire = Loadable(lazy(() => import('pages/AnneeScolaire')));
const Classe = Loadable(lazy(() => import('pages/Classe')));
const Images = Loadable(lazy(() => import('pages/Image')));
const Enseignant = Loadable(lazy(() => import('pages/Enseignant')));
const Parent = Loadable(lazy(() => import('pages/Parent')));
const Profile = Loadable(lazy(() => import('pages/Profile')));

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
    },
    {
      path: '/upload/:id',
      element: <Images />
    },
    {
      path: '/enseignant',
      element: <Enseignant />
    },
    {
      path: '/parent',
      element: <Parent />
    },
    {
      path: '/profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;
