// material-ui
import { Grid, Typography, TextField, Stack, Button, ListItemButton, List, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

import { UserOutlined } from '@ant-design/icons';
// project import
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import Popup from 'Control/Modal';
import Inscription from './Inscription';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import { lien_image } from 'utils/Liens';

// sales report status
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

function Eleve() {
  const eleve = useSelector((state) => state.eleveinfo);
  const [open, setOpen] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });
  const handleChange = (e) => {
    let target = e.target.value.toUpperCase();

    setFilterFn({
      fn: (items) => {
        if (target === '') {
          return items;
        } else {
          return items.filter((x) => x.fullname.includes(target));
        }
      }
    });
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Statistique des eleves par classe</Typography>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 1.75 }}>
            <SalesColumnChart titleOne="Garçons" titleTwo="Fille" />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4} sx={{ paddingLeft: '5px' }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Recentes inscriptions</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                }
              }}
            >
              <Stack sx={{ width: '100%', padding: '5px' }}>
                <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }} onClick={() => setOpen(true)}>
                  Inscription
                </Button>
              </Stack>
              <Stack sx={{ width: '100%', padding: '5px' }}>
                <TextField id="idLabel" label="Cherchez un élève" onChange={(e) => handleChange(e)} variant="outlined" fullWidth />
              </Stack>
              {eleve.eleve ? (
                filterFn.fn(eleve.eleve).map((index, key) => {
                  if (key < 5) {
                    return (
                      <ListItemButton divider key={index._id}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              color: 'success.main',
                              bgcolor: 'success.lighter'
                            }}
                          >
                            {index.filename ? <img src={`${lien_image}/${index.filename}`} alt={index.nom} /> : <UserOutlined />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="subtitle1">{index.fullname}</Typography>}
                          secondary={`code : ${index.codeEleve} tut : ${index.contactTuteur}`}
                        />
                      </ListItemButton>
                    );
                  }
                })
              ) : (
                <p>Loading</p>
              )}
            </List>
          </MainCard>
        </Grid>
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Inscription">
        <Inscription />
      </Popup>
    </>
  );
}
export default Eleve;
