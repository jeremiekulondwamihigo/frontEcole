// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'finance',
  title: 'Finance',
  type: 'group',
  children: [
    {
      id: 'echeance',
      title: 'Echéance',
      type: 'item',
      url: '/finance/echeance',
      icon: icons.FontSizeOutlined,
      breadcrumbs: false
    },
    {
      id: 'finance',
      title: 'Payement',
      type: 'item',
      url: '/finance/payement',
      icon: icons.BgColorsOutlined,
      breadcrumbs: false
    },
    {
      id: 'rapport',
      title: 'Rapport',
      type: 'item',
      url: '/finance/rapport',
      icon: icons.BarcodeOutlined,
      breadcrumbs: false
    },
    {
      id: 'depenses',
      title: 'Dépenses',
      type: 'item',
      url: '/icons/ant',
      icon: icons.AntDesignOutlined,
      breadcrumbs: false
    },
    {
      id: 'statistiques',
      title: 'Statistiques',
      type: 'item',
      url: '/icons/ant',
      icon: icons.AntDesignOutlined,
      breadcrumbs: false
    },
    {
      id: 'paie_agent',
      title: 'Salaire agent',
      type: 'item',
      url: '/icons/ant',
      icon: icons.AntDesignOutlined,
      breadcrumbs: false
    }
  ]
};

export default utilities;
