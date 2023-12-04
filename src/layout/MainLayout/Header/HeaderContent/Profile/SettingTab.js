import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// assets
import {
  MoneyCollectOutlined,
  CalendarOutlined,
  FormatPainterOutlined,
  BorderTopOutlined,
  ScheduleOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 0) {
      navigate('/option');
    }
    if (index === 1) {
      navigate('/classe');
    }
    if (index === 2) {
      navigate('/cours');
    }
    if (index === 3) {
      navigate('/recouvrement');
    }
    if (index === 4) {
      navigate('/acces');
    }
    if (index === 5) {
      navigate('/annee');
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
        <ListItemIcon>
          <CalendarOutlined />
        </ListItemIcon>
        <ListItemText primary="Année scolaire" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <BorderTopOutlined />
        </ListItemIcon>
        <ListItemText primary="Option" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <ScheduleOutlined />
        </ListItemIcon>
        <ListItemText primary="Classe" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <FormatPainterOutlined />
        </ListItemIcon>
        <ListItemText primary="Cours" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
        <ListItemIcon>
          <MoneyCollectOutlined />
        </ListItemIcon>
        <ListItemText primary="Recouvrement" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary="Accès" />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
