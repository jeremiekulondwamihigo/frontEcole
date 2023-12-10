/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletes } from 'utils/Liens';
import { DataGrid } from '@mui/x-data-grid';
import { Fab } from '@mui/material';
import { EditOutlined, DownSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { DesactiverAnnee } from 'Redux/Annee';
import DirectionSnackbar from 'Control/Message';
import { CreateContexte } from 'Context';

const Annee = () => {
  const annes = useSelector((state) => state.annee);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const deleteYear = async (id) => {
    const response = await deletes(`annee/${id}`);
    console.log(response);
  };
  const { user } = useContext(CreateContexte);
  const desactiverYear = async (id, valeur) => {
    const data = { id, valeur, codeEtablissement: user?.codeEtablissement };
    dispatch(DesactiverAnnee(data));
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Date',
      width: 150,
      renderCell: (params) => {
        return <span>{new Date(params.row.id).toLocaleDateString().toString()}</span>;
      }
    },
    {
      field: 'annee',
      headerName: 'Annee',
      width: 180
    },

    {
      field: 'active',
      headerName: 'Active',
      width: 130,
      renderCell: (params) => {
        return params.row.active ? 'En cours' : 'En attente';
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <span
            style={{
              marginRight: '30px',
              justifyContent: 'space-between'
            }}
          >
            <Fab color="primary" size="small" onClick={() => desactiverYear(params.row._id, !params.row.active)}>
              {params.row.active ? <DownSquareOutlined /> : <EditOutlined />}{' '}
            </Fab>
            <Fab
              size="small"
              color="secondary"
              style={{ marginLeft: '10px' }}
              onClick={() => {
                deleteYear(params.row.code_Annee);
              }}
            >
              <DeleteOutlined />
            </Fab>
          </span>
        );
      }
    }
  ];

  return (
    <div>
      {annes.desactiver === 'rejected' && <DirectionSnackbar open={open} setOpen={setOpen} message={annes.desactiverError} /> }
      {annes.desactiver === 'success' && <DirectionSnackbar open={open} setOpen={setOpen} message="Opération effectuée" /> }
      {annes && (
        <div
          style={{
            width: '100%',
            marginTop: '15px',
            height: 450
          }}
        >
          <DataGrid rows={annes.annee} columns={columns} pageSize={6} rowsPerPageOptions={[6]} checkboxSelection />
        </div>
      )}

    </div>
  );
};
export default Annee;
