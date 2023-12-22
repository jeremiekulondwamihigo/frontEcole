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
import MainCard from 'components/MainCard';

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
      setClasseSelect(_.filter(option[0].classe, { codeClasse: indexe }));
      setShowDataClasseSelect(indexe);
    }
  };
  const [classe, setClasse] = useState();
  const fetchClasse = () => {
    let data = [];
    if (option.length > 0 && option[0].classe.length > 0) {
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
    <MainCard>
      <Grid container>
        {option && classe && (
          <Grid item lg={2}>
            <Dropdown overlay={<Menu onClick={(e) => clockOption(e.key)} items={classe}></Menu>} trigger={['contextMenu']}>
              <div className={option[0].active ? 'greenBackground' : 'redBackground'}>
                <Typography sx={{ fontSize: '12px' }} noWrap>
                  {option[0].option} {classeSelect && 'Niveau ' + classeSelect[0].niveau + 'e' + classeSelect[0].indexe}
                </Typography>
              </div>
            </Dropdown>
          </Grid>
        )}
      </Grid>
      <Grid container>
        <Grid item lg={4}>
          {classeSelect && <Cours />}
        </Grid>
        <Grid item lg={8}>
          {' '}
          <Affichage />
        </Grid>
      </Grid>
      <Popup open={open} setOpen={setOpen} title="Ajoutez une classe">
        <FormClasse codeOption={id} />
      </Popup>
    </MainCard>
  );
}
export default memo(Index);
