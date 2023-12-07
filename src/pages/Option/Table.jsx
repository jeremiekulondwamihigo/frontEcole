/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Menu } from 'antd';
import { DataGrid } from '@mui/x-data-grid';
import { MessageOutlined } from '@ant-design/icons/lib/icons';
import { putOption } from 'Redux/Option';
import { Fab } from '@mui/material';
import { FolderAddOutlined } from '@ant-design/icons';
import Formulaire from './Formulaire';
import Popup from 'Control/Modal';

const Options = () => {
  const option = useSelector((state) => state.option);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [updated, setUpdated] = React.useState({ id: '', data: '' });
  const { id, data } = updated;

  const fonction = (id, data) => {
    setUpdated({ id, data });
    setOpenUpdate(true);
  };
  console.log(data, id);

  const RenameDebloquer = (id, data) => {
    let donner = { id, data };
    dispatch(putOption(donner));
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
      field: 'codeOption',
      headerName: 'code Option',
      width: 180
    },

    {
      field: 'option',
      headerName: 'Option',
      width: 130
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 130,
      renderCell: (params) => {
        return <>{params.row.active ? 'En cours' : <span style={{ color: 'red' }}>En attente</span>}</>;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    label: 'Renommer',
                    key: 'Copy',
                    icon: <MessageOutlined onClick={() => fonction(params.row._id, params.row.option)} />
                  },
                  {
                    label: params.row.active ? 'Bloquer' : 'Débloquer',
                    key: 'Bloquer',
                    icon: <MessageOutlined onClick={() => RenameDebloquer(params.row._id, { active: !params.row.active })} />
                  },
                  {
                    label: 'Supprimez',
                    key: 'Supprimer',
                    icon: <MessageOutlined />
                  },
                  {
                    label: 'Ajoutez une classe',
                    key: 'add',
                    icon: <MessageOutlined />
                  },
                  {
                    label: 'Plus des détails',
                    key: 'plus',
                    icon: <MessageOutlined />
                  }
                ]}
              ></Menu>
            }
            trigger={['contextMenu']}
          >
            <p>Clique droit</p>
          </Dropdown>
        );
      }
    }
  ];

  return (
    <>
      <div>
        <Fab size="small" color="primary" onClick={() => setOpen(true)}>
          <FolderAddOutlined />
        </Fab>
      </div>
      {option && (
        <div
          style={{
            width: '100%',
            marginTop: '15px',
            height: 450
          }}
        >
          <DataGrid rows={option.option} columns={columns} pageSize={6} rowsPerPageOptions={[6]} checkboxSelection />
        </div>
      )}
      <Popup open={open} setOpen={setOpen} title="Ajoutez une option">
        <Formulaire />
      </Popup>
      {data && id && (
        <Popup open={openUpdate} setOpen={setOpenUpdate} title="Modifier une option">
          <Formulaire data={data} id={id} />
        </Popup>
      )}
    </>
  );
};
export default Options;
