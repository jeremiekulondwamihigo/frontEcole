import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonLoading from 'Control/Button';
import { useDispatch } from 'react-redux';
import { postOption } from 'Redux/Option';
import { CreateContexte } from 'Context';

// eslint-disable-next-line react/prop-types
function FormOption({ data, id }) {
  const [option, setValeur] = React.useState('');
  const dispactch = useDispatch();
  const { user } = React.useContext(CreateContexte);
  const sendData = async () => {
    let data = { option, codeEtablissement: user?.codeEtablissement };
    dispactch(postOption(data));
  };
  React.useEffect(() => {
    if (data && id) {
      console.log(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id]);
  return (
    <Box
      component="form"
      sx={{
        width: '20rem'
      }}
      noValidate
      autoComplete="on"
    >
      <TextField value={option} onChange={(e) => setValeur(e.target.value)} id="idOption" label="Option...." variant="outlined" fullWidth />
      <ButtonLoading loading={false} fonction={sendData} title="Enregistrer" />
    </Box>
  );
}
export default FormOption;
