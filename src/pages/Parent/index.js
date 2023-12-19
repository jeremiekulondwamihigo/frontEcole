import React from 'react';
import Popup from 'Control/Modal';
import Formulaire from './Formulaire';
import { Fab, Grid, Tooltip } from '@mui/material';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { DataGrid } from '@mui/x-data-grid';
import { dateFrancais } from 'utils/Utils';
import { FolderAddOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';

function Index() {
  const [open, setOpen] = React.useState(false);
  const listeParent = useSelector((state) => _.filter(state.parents.parent, { status: 'parent' }));

  const columns = [
    {
      field: 'nom',
      headerName: 'Nom complet',
      width: 190
    },
    {
      field: 'telephone',
      headerName: 'Contact',
      width: 180
    },

    {
      field: 'eleves',
      headerName: 'Eleves',
      width: 130,
      renderCell: (params) => {
        return params.row.eleveListe.length > 0 ? params.row.eleveListe.length : 'Aucun';
      }
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 130,
      renderCell: (params) => {
        return <>{params.row.active ? 'Activé' : <span style={{ color: 'red' }}>En attente</span>}</>;
      }
    },
    {
      field: 'dates',
      headerName: 'Date',
      width: 130,
      renderCell: (params) => {
        return dateFrancais(params.row.createdAt);
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: () => {
        return (
          <>
            <Tooltip title="Ses eleves">
              <Fab size="small" color="primary">
                <FolderAddOutlined />
              </Fab>
            </Tooltip>
            <Tooltip title="Bloquer">
              <Fab size="small" color="warning" sx={{ marginLeft: '5px' }}>
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
