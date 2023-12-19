// import AddCours from './AddCours';
import { Grid, Fab, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useContext, useState } from 'react';
import { CreateContexte } from 'Context';
import AddCours from './AddCours';
import { DataGrid } from '@mui/x-data-grid';
import Popup from 'Control/Modal';

import { FileDoneOutlined } from '@ant-design/icons';

function Index() {
  const [open, setOpen] = useState(false);
  const { showDataClasseSelect } = useContext(CreateContexte);
  const coursclasse = useSelector((state) => _.filter(state.cours.cours, { codeClasse: showDataClasseSelect }));
  const columnClasse = [
    {
      field: 'branche',
      headerName: 'Branche / max periode',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.row.branche}
            <br />
            maxima : {params.row.maxima}points examen validé
          </>
        );
      }
    },
    {
      field: 'enseignant',
      headerName: 'Enseignant',
      width: 80,
      renderCell: () => {
        return <>JEREMIE MIHIGO</>;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 50,
      renderCell: () => {
        return (
          <Tooltip title="Modifiez le cours">
            <Fab size="small" color="primary">
              <FileDoneOutlined />{' '}
            </Fab>
          </Tooltip>
        );
      }
    }
  ];
  return (
    <>
      <Grid>
        {coursclasse && <DataGrid rows={coursclasse} columns={columnClasse} pageSize={5} rowsPerPageOptions={[5]} />}
        {/* <AddCours /> */}
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Ajoutez un cours">
        <AddCours />
      </Popup>
    </>
  );
}
export default Index;
