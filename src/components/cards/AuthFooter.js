// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          &copy; Knowledge Center KC {new Date().getFullYear()}. Tous droits réservés &nbsp;
          <Typography component={Link} variant="subtitle2" href="https://facebook.com" target="_blank" underline="hover">
            contactez-nous
          </Typography>
        </Typography>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
