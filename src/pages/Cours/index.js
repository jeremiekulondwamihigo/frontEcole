import './style.css';
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
  const [openModifier, setOpenModifier] = useState(false);
  const { showDataClasseSelect } = useContext(CreateContexte);
  const coursclasse = useSelector((state) => _.filter(state.cours.cours, { codeClasse: showDataClasseSelect }));
  const [coursSelect, setCoursSelect] = useState();

  const openPopup = (e, index) => {
    e.preventDefault();
    setCoursSelect(index);
    setOpenModifier(true);
  };
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
            maxima : {params.row.maxima}points {params.row.validExamen ? 'valide examen' : "y a pas l'examen"}
          </>
        );
      }
    },
    {
      field: 'enseignant',
      headerName: 'Enseignant',
      width: 80,
      renderCell: (params) => {
        return <>{params.row.enseignant.length > 0 ? params.row.enseignant[0].nom : ''}</>;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 50,
      renderCell: (params) => {
        return (
          <Tooltip title="Modifiez le cours">
            <Fab size="small" color="primary" onClick={(e) => openPopup(e, params.row)}>
              <FileDoneOutlined />{' '}
            </Fab>
          </Tooltip>
        );
      }
    }
  ];
  return (
    <>
      <Fab size="small" color="primary" onClick={() => setOpen(true)}>
        <FileDoneOutlined />
      </Fab>
      <Grid>
        {coursclasse && (
          <div className="cours">
            <DataGrid rows={coursclasse} columns={columnClasse} pageSize={6} rowsPerPageOptions={[6]} />
          </div>
        )}
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Ajoutez un cours">
        <AddCours />
      </Popup>
      <Popup open={openModifier} setOpen={setOpenModifier} title="Modifiez un cours">
        <AddCours cour={coursSelect} />
      </Popup>
    </>
  );
}
export default Index;
