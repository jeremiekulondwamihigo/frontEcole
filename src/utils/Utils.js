export const EnLettre = (value) => {
  if (value === 1) {
    return 'Premiere';
  }
  if (value === 2) {
    return 'Deuxieme';
  }
  if (value === 3) {
    return 'Troisieme';
  }
  if (value === 4) {
    return 'Quatrieme';
  }
  if (value === 7) {
    return 'Septieme';
  }
  if (value === 8) {
    return 'Huitieme';
  }
};
export const dateFrancais = (donner) => {
  let dates = new Date(donner);
  return `${dates.getDate()}/${dates.getMonth() + 1}/${dates.getFullYear()}`;
};
export const retourneOption = (index) => {
  const split = index.split(' ');
  let option = [];
  for (let i = 0; i < split.length; i++) {
    if (split[i].length > 3) {
      option.push(split[i].charAt(0).toUpperCase());
    }
  }
  return option.join('');
};

//Retourne la liste des classes
export const loadingClasse = (option) => {
  let table = [];
  let classAll = option.filter((x) => x.classe?.length > 0);
  for (let i = 0; i < classAll.length; i++) {
    for (let y = 0; y < classAll[i].classe.length; y++) {
      table.push(classAll[i].classe[y]);
    }
  }
  return table;
};
