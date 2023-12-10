import FormClasse from './FormClasse';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import './style.css';
import { Dropdown, Menu } from 'antd';
import { MessageOutlined } from '@ant-design/icons/lib/icons';
import { memo, useContext, useEffect, useState } from 'react';
import { EnLettre } from 'utils/Utils';
import Popup from 'Control/Modal';
import Cours from 'pages/Cours';
import Affichage from './Affichage';
import { CreateContexte } from 'Context';

function Index() {
  const { id } = useParams();
  const { setShowDataClasseSelect } = useContext(CreateContexte);
  const option = useSelector((state) => _.filter(state.option.option, { codeOption: id }));
  const [classeSelect, setClasseSelect] = useState();
  const [open, setOpen] = useState(false);
  const clockOption = (indexe) => {
    if (indexe === 'add') {
      setOpen(true);
    } else {
      setClasseSelect(indexe);
      setShowDataClasseSelect(indexe);
    }
  };
  const [classe, setClasse] = useState();
  const fetchClasse = () => {
    let data = [];
    if (option && option[0].classe.length > 0) {
      for (let i = 0; i < option[0].classe.length; i++) {
        data.push({
          label: EnLettre(parseInt(option[0].classe[i].niveau)),
          key: option[0].classe[i].codeClasse,
          icon: <MessageOutlined />
        });
      }
    }
    data.push({
      label: 'Ajoutez une classe',
      key: 'add',
      icon: <MessageOutlined />
    });
    setClasse(data);
  };
  useEffect(() => {
    fetchClasse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, option]);

  return (
    <>
      <Grid container spacing={1}>
        {option && classe && (
          <Grid lg={2}>
            <Dropdown overlay={<Menu onClick={(e) => clockOption(e.key)} items={classe}></Menu>} trigger={['contextMenu']}>
              <div className={option[0].active ? 'greenBackground' : 'redBackground'}>
                <Typography sx={{ fontSize: '12px' }} noWrap>
                  {option[0].option}
                </Typography>
              </div>
            </Dropdown>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={1}>
        <Grid lg={2} sx={{ marginTop: '20px' }}>
          {classeSelect && <Cours />}
        </Grid>
        <Grid lg={10}>
          {' '}
          <Affichage />
        </Grid>
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Ajoutez une classe">
        <FormClasse codeOption={id} />
      </Popup>
    </>
  );
}
export default memo(Index);
