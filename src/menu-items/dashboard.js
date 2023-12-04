// assets
import { DashboardOutlined, UsergroupAddOutlined, FileExcelOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UsergroupAddOutlined,
  FileExcelOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Admin',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'eleve',
      title: 'Eleves',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false
    },
    {
      id: 'rapport_eleve',
      title: 'Rapport',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.FileExcelOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
