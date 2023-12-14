import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Fab, Tooltip, Avatar } from '@mui/material';
import { FileDoneOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function TableEleve() {
  const navigation = useNavigate();
  const inscrit = useSelector((state) => state.inscrit.inscrit);
  const annee = useSelector((state) => state.annee.annee);
  const [data, setData] = React.useState();

  const loading = () => {
    let annees = _.filter(annee, { active: true });
    if (annees.length > 0) {
      let donner = _.filter(inscrit, { codeAnnee: annees[0].codeAnnee });
      setData(donner);
    }
  };

  useEffect(() => {
    loading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inscrit, annee]);
  const openImages = (id) => {
    navigation('/upload/' + id, { replace: true });
  };
  const column = [
    {
      field: 'filename',
      headerName: 'IMG',
      width: 30,
      renderCell: (params) => {
        return (
          <Avatar
            alt="avat"
            onClick={() => openImages(params.row.eleve._id)}
            src={params.row.eleve.filename ? params.row.eleve.filename : <UserOutlined />}
          />
        );
      }
    },
    { field: 'codeEleve', headerName: 'ID Elève', width: 80 },

    {
      field: 'nom',
      headerName: 'Fullname',
      width: 195,
      renderCell: (params) => {
        return params.row.eleve.nom + ' ' + params.row.eleve.postnom + ' ' + params.row.eleve.prenom;
      }
    },
    {
      field: 'lieu_naissance',
      headerName: 'Lieu et date de naissance',
      width: 150,
      renderCell: (params) => {
        return params.row.eleve.lieu_naissance + ' le, ' + params.row.eleve.date_naissance;
      }
    },
    {
      field: 'eleve.genre',
      headerName: 'Genre',
      width: 100,
      renderCell: (params) => {
        return params.row.eleve.genre;
      }
    },
    {
      field: 'eleve.contactTuteur',
      headerName: 'Contact',
      width: 100,
      renderCell: (params) => {
        return params.row.eleve.contactTuteur;
      }
    },
    {
      field: 'eleve.niveau',
      headerName: 'Niveau',
      width: 60,
      renderCell: (params) => {
        return params.row.classe.niveau;
      }
    },
    {
      field: 'eleve.option',
      headerName: 'Option',
      width: 150,
      renderCell: (params) => {
        return params.row.option.option;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: () => {
        return (
          <>
            <Tooltip title="Modifier">
              <Fab color="primary" size="small">
                <FileDoneOutlined />
              </Fab>
            </Tooltip>
            <Tooltip title="Déclarez l'elève comme un abandon">
              <Fab color="warning" size="small" sx={{ marginLeft: '5px' }}>
                <FileDoneOutlined />
              </Fab>
            </Tooltip>
            <Tooltip title="Details de l'élève">
              <Fab color="secondary" size="small" sx={{ marginLeft: '5px' }}>
                <FileDoneOutlined />
              </Fab>
            </Tooltip>
          </>
        );
      }
    }
  ];
  return <div>{data && <DataGrid rows={data} columns={column} pageSize={5} rowsPerPageOptions={[5]} />}</div>;
}

export default TableEleve;
