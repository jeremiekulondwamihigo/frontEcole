import React from 'react';
import TabComponent from 'Control/Tab';
import NouvelleInscription from './NouvelleInscription';
import Reinscription from './Reinscription';

function Inscription() {
  const title = [
    { id: 0, label: 'Nouvelle inscription' },
    { id: 1, label: 'inscription' }
  ];
  const component = [
    { id: 0, component: <NouvelleInscription /> },
    { id: 1, component: <Reinscription /> }
  ];
  return (
    <>
      <TabComponent titres={title} components={component} />
    </>
  );
}

export default Inscription;
