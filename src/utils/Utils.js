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
