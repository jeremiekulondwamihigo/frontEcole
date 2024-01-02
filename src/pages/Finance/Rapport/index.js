import React from 'react';
import TabComponent from 'Control/Tab';
import MainCard from 'components/MainCard';

function Index() {
  const titres = [
    { id: 0, label: 'Rapport de paie' },
    { id: 1, label: 'Recouvrement' }
  ];
  const components = [{ id: 0, component: <p>Rapport de paie</p> }];
  return (
    <MainCard>
      <TabComponent titres={titres} components={components} />
    </MainCard>
  );
}

export default Index;
