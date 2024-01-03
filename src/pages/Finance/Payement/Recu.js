/* eslint-disable react/prop-types */
import React from 'react';
import jsPDF from 'jspdf';
import { Print } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { useSelector } from 'react-redux';
import { dateFrancais } from 'utils/Utils';
(function (API) {
  API.myText = function (txt, options, x, y) {
    options = options || {};
    if (options.align === 'center') {
      var fontSize = this.internal.getFontSize();
      var pageWidth = this.internal.pageSize.width;
      let txtWidth = (this.getStringUnitWidth(txt) * fontSize) / this.internal.scaleFactor;

      x = (pageWidth - txtWidth) / 2;
    }

    this.text(txt, x, y);
  };
})(jsPDF.API);
// eslint-disable-next-line react/prop-types
function Recu({ data, eleve }) {
  console.log(data);
  const user = useSelector((state) => state.user.user);
  const printRecu = (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    const taille = 1.45;

    var doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [4, 2]
    });
    doc.setFontSize(6);
    // doc.addImage(isc, 'JPEG', 0.2, 0.01, 0.5, 0.43);
    // doc.addImage(isc, 'JPEG', 3.2, 0.01, 0.5, 0.43);
    doc.myText('REPUBLIQUE DEMOCRATIQUE DU CONGO', { align: 'center' }, 1, 0.1);
    doc.myText("MINISTERE DE L'ENSEIGNEMENT PRIMAIRE, SECONDAIRE ET TECHNIQUE", { align: 'center' }, 0.99, 0.2);
    doc.myText(user?.etablissement, { align: 'center' }, 1.8, 0.3);
    doc.text(
      0.1,
      0.5,
      '--------------------------------------------------------------------------------------------------------------------------------------'
    );
    doc.myText('Reçu de Paiement n° : 00' + data.id, { align: 'center' }, 1.5, 0.6);
    doc.text(0.2, 0.8, 'Elève');
    // eslint-disable-next-line react/prop-types
    doc.text(taille, 0.8, ': ' + eleve.eleve.nom + ' ' + eleve.eleve.postnom + ' ' + eleve.eleve.prenom);
    doc.text(0.2, 1.08, 'Pour');
    doc.text(taille, 1.08, ': ' + data.titre);
    doc.text(0.2, 1.22, 'Montant payé');
    // eslint-disable-next-line react/prop-types
    doc.text(taille, 1.22, ': ' + data.montant + ' $ (' + NumberToLetter(data.montant) + ' dollars)');
    doc.text(0.2, 1.36, 'reste à payer');
    // eslint-disable-next-line react/prop-types
    doc.text(taille, 1.36, ': ' + data.reste + ' $ (' + NumberToLetter(data.reste) + ' dollars)');
    doc.text(taille, 1.55, 'Fait à Goma, le : ' + dateFrancais(data.createdAt));

    doc.autoPrint();
    const blob = doc.output('bloburl');
    window.open(blob);
  };
  return (
    <Fab size="small" color="primary" onClick={(e) => printRecu(e)}>
      <Print fontSize="small" />
    </Fab>
  );
}

export default Recu;
