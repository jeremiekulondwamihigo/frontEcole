import React from 'react';
import { useSelector } from 'react-redux';
import {
  Fab,
  Grid,
  Typography,
  ListItemText,
  List,
  ListItemButton,
  ListItemSecondaryAction,
  Stack,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { Edit, Add } from '@mui/icons-material';
import './style.css';
import MainCard from 'components/MainCard';
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import Popup from 'Control/Modal';
import Forme from './Form';
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

function Index() {
  const frais = useSelector((state) => state.recouvrement);
  const [open, setOpen] = React.useState(false);
  const [openRecouvrement, setOpenRecouvrement] = React.useState(false);
  const [donner, setDonner] = React.useState();

  const updateRecouvrement = (data, e) => {
    e.preventDefault();
    setDonner(data);
    setOpenRecouvrement(true);
  };

  return (
    <>
      <Fab onClick={() => setOpen(true)} size="small" color="primary" sx={{ marginBottom: '10px' }}>
        <Add fontSize="small" />
      </Fab>
      <Grid container>
        <Grid lg={8}>
          <table>
            <thead>
              <tr>
                <td>Active</td>
                <td>Frais</td>

                <td>% à recouvrer</td>
                <td>Update</td>
              </tr>
            </thead>
            <tbody>
              {frais &&
                frais.recouvrement.map((index) => {
                  return (
                    <tr key={index._id}>
                      <td>{index.active ? 'En cours' : 'Achevé'}</td>
                      <td>{index.title.title}</td>

                      <td>{index.pourcentage}%</td>
                      <td>
                        <Fab size="small" onClick={(e) => updateRecouvrement(index, e)}>
                          <Edit fontSize="small" />
                        </Fab>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Grid>

        <Grid item xs={12} md={5} lg={4}>
          <MainCard sx={{ ml: 2 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1.5,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': {
                    ...actionSX,
                    position: 'relative'
                  }
                }
              }}
            >
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'success.main',
                      bgcolor: 'success.lighter'
                    }}
                  >
                    <GiftOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1">Classe</Typography>}
                  secondary="% sur le montant total à recouvrer"
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      $16
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      78%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'primary.main',
                      bgcolor: 'primary.lighter'
                    }}
                  >
                    <MessageOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $302
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      8%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'error.main',
                      bgcolor: 'error.lighter'
                    }}
                  >
                    <SettingOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $682
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      16%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
            </List>
          </MainCard>
        </Grid>
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Parametre">
        <Forme />
      </Popup>
      <Popup open={openRecouvrement} setOpen={setOpenRecouvrement} title="Modifiez">
        <Forme donner={donner} />
      </Popup>
    </>
  );
}

export default Index;
