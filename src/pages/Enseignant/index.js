import React from 'react';
import Popup from 'Control/Modal';
import Formulaire from './Formulaire';
import { Fab, Grid, Tooltip, Avatar } from '@mui/material';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { DataGrid } from '@mui/x-data-grid';
import { dateFrancais } from 'utils/Utils';
import { FolderAddOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from './Analytic';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

function Index() {
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);
  const listeParent = useSelector((state) => _.filter(state.parents.parent, { status: 'enseignant' }));
  const openImages = (id) => {
    navigation('/upload/' + id, { replace: true });
  };

  const getPourcentage = (taille) => {
    return (taille.length * 100) / 25;
  };
  const getCouleur = (taille) => {
    if (taille < 10) {
      return 'error';
    }
    if (taille > 10 && taille < 20) {
      return 'warning';
    }
    if (taille > 20) {
      return 'success';
    }
  };

  const columns = [
    {
      field: 'filenale',
      headerName: '#',
      width: 60,
      renderCell: (params) => {
        return (
          <Tooltip title="Importez la photo de l'enseignant">
            <Avatar
              alt={params.row.nom.substr(0, 1)}
              sx={{ cursor: 'pointer' }}
              onClick={() => openImages(params.row._id)}
              src={params.row.filename ? params.row.filename : <UserOutlined />}
            />
          </Tooltip>
        );
      }
    },
    {
      field: 'code',
      headerName: 'ID',
      width: 100
    },
    {
      field: 'nom',
      headerName: 'Nom complet',
      width: 190
    },
    {
      field: 'telephone',
      headerName: 'Contact',
      width: 100
    },
    {
      field: 'eleves',
      headerName: 'Eleves',
      width: 80,
      renderCell: (params) => {
        return params.row.eleveListe.length > 0 ? params.row.eleveListe.length : 'Aucun';
      }
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 50,
      renderCell: (params) => {
        return <>{params.row.active ? 'Activé' : <span style={{ color: 'red' }}>En attente</span>}</>;
      }
    },
    {
      field: 'dates',
      headerName: 'Date',
      width: 100,
      renderCell: (params) => {
        return dateFrancais(params.row.createdAt);
      }
    },
    {
      field: 'cours',
      headerName: 'Cours',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <AnalyticEcommerce
              percentage={getPourcentage(params.row.cours)}
              count="7"
              isLoss={getPourcentage(params.row.cours) >= 50 ? false : true}
              color={getCouleur(params.row.cours.length)}
            />
          </>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: () => {
        return (
          <>
            <Tooltip title="Bloquer">
              <Fab size="small" color="warning" sx={{ marginLeft: '5px' }}>
                <FolderAddOutlined />
              </Fab>
            </Tooltip>
            <Tooltip title="Details : salaire, cours, paie">
              <Fab size="small" color="info" sx={{ marginLeft: '5px' }}>
                <FolderAddOutlined />
              </Fab>
            </Tooltip>
          </>
        );
      }
    }
  ];
  return (
    <>
      <Grid sx={{ marginBottom: '15px' }}>
        <Fab size="small" color="primary" onClick={() => setOpen(true)}>
          <AppstoreAddOutlined />
        </Fab>
      </Grid>
      <MainCard>
        {listeParent && (
          <div
            style={{
              width: '100%',
              marginTop: '15px',
              height: 450
            }}
          >
            <DataGrid rows={listeParent} columns={columns} pageSize={6} rowsPerPageOptions={[6]} checkboxSelection />
          </div>
        )}
      </MainCard>

      <Popup open={open} setOpen={setOpen} title="Ajoutez un parent">
        <Formulaire />
      </Popup>
    </>
  );
}

export default Index;
