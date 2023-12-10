import React from 'react';
import Tables from './Table';
import { FolderAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Popup from 'Control/Modal';
import FormAnnee from './FormAnnee';
import MainCard from 'components/MainCard';

function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <MainCard>
        <Button type="primary" icon={<FolderAddOutlined />} size="large" onClick={() => setOpen(true)}>
          Ajouter l&apos;année scolaire
        </Button>
        <Tables />
        <Popup open={open} setOpen={setOpen} title="Ajoutez l'année scolaire">
          <FormAnnee />
        </Popup>
      </MainCard>
    </div>
  );
}

export default index;
