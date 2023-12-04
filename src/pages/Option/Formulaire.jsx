import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonLoading from 'Control/Button';
import { useDispatch } from 'react-redux';
import { postOption } from 'Redux/Option';

// eslint-disable-next-line react/prop-types
function FormOption({ data, id }) {
  const [option, setValeur] = React.useState('');
  const dispactch = useDispatch();
  const sendData = async () => {
    dispactch(postOption(option));
  };
  React.useEffect(() => {
    if (data && id) {
      setValeur({
        ...option,
        ...data
      });
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
