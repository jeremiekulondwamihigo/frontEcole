import React from 'react';
import { useSelector } from 'react-redux';
import { dateFrancais, loadingClasse, retourneOption } from 'utils/Utils';
import _ from 'lodash';
function Echeance() {
  const echeance = useSelector((state) => state.title.title);
  const option = useSelector((state) => state.option.option);
  const classe = loadingClasse(option);
  console.log(classe, echeance);
  const returnOption = (codeOption) => {
    return retourneOption(_.filter(option, { codeOption })[0].option);
  };
  const retournerFrais = (tranche, classes) => {
    let tranches = _.filter(echeance, { codeTitle: tranche });
    if (tranches.length > 0) {
      let trancheClasse = tranches[0].frais.filter((x) => x.codeClasse === classes);
      if (trancheClasse.length > 0) {
        return trancheClasse[0].montant + '$';
      } else {
        return '';
      }
    }
  };
  const retournerTotal = (index) => {
    let somme = 0;
    for (let i = 0; i < echeance.length; i++) {
      for (let y = 0; y < echeance[i].frais.length; y++) {
        if (echeance[i].frais[y].codeClasse === index) {
          somme = somme + echeance[i].frais[y].montant;
        }
      }
    }
    return somme + '$';
  };
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className="titleClasse">Frais</td>
            {classe &&
              classe.map((item) => {
                return (
                  <td className="titleClasse" key={item._id}>
                    {item.niveau}
                    <sup>e</sup>
                    {returnOption(item.codeOption)}
                  </td>
                );
              })}
            <td className="titleClasse">Début</td>
            <td className="titleClasse">Fin</td>
          </tr>
          {echeance &&
            echeance.map((index, cle) => {
              return (
                <React.Fragment key={index._id}>
                  <tr>
                    <td className="trancheTitle">{index.title}</td>
                    {classe &&
                      classe.map((classes) => {
                        return (
                          <td
                            key={classes._id}
                            className={`${retournerFrais(index.codeTitle, classes.codeClasse) === '' ? 'blackClasse' : 'whiteClasse'}`}
                          >
                            {retournerFrais(index.codeTitle, classes.codeClasse)}
                          </td>
                        );
                      })}
                    <td>{dateFrancais(index.debut)}</td>
                    <td>{dateFrancais(index.fin)}</td>
                  </tr>
                  {echeance.length - 1 === cle && (
                    <tr>
                      <td>Total</td>
                      {classe.map((items, key) => {
                        return <td key={key}>{retournerTotal(items.codeClasse)}</td>;
                      })}

                      <td className="blackClasse"></td>
                      <td className="blackClasse"></td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Echeance;
