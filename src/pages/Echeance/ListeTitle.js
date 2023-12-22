/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector } from 'react-redux';
import { dateFrancais } from 'utils/Utils';

function ListeTitle({ setTitleSelect, titre }) {
  const title = useSelector((state) => state.title.title);
  return (
    <div>
      {title &&
        title.map((index) => {
          return (
            <div
              key={index._id}
              className={titre === index.codeTitle ? 'titreFraisDiv titreSelect' : 'titreFraisDiv'}
              onClick={() => setTitleSelect(index.codeTitle)}
            >
              <p className="titreFrais">{index.title}</p>
              <p className="dates">
                du {dateFrancais(index.debut)} au {dateFrancais(index.fin)}
              </p>
              <p className="reste">reste 5 jours avant le recouvrement</p>
            </div>
          );
        })}
    </div>
  );
}

export default ListeTitle;
