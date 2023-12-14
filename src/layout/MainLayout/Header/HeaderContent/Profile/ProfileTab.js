import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { MessageOutlined, TeamOutlined, LogoutOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';
import { CreateContexte } from 'Context';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { LogOut } = useContext(CreateContexte);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    event.preventDefault();
    setSelectedIndex(index);
    if (index === 0) {
      navigate('/sms', { replace: true });
    }
    if (index === 1) {
      navigate('/profile', { replace: true });
    }
    if (index === 2) {
      navigate('/enseignant', { replace: true });
    }
    if (index === 3) {
      navigate('/carte', { replace: true });
    }
    if (index === 4) {
      navigate('/parent', { replace: true });
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <MessageOutlined />
        </ListItemIcon>
        <ListItemText primary="SMS" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <TeamOutlined />
        </ListItemIcon>
        <ListItemText primary="Enseignants" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 3)}>
        <ListItemIcon>
          <IdcardOutlined />
        </ListItemIcon>
        <ListItemText primary="Carte de l'élève" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
        <ListItemIcon>
          <TeamOutlined />
        </ListItemIcon>
        <ListItemText primary="Parents" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={() => LogOut()}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
