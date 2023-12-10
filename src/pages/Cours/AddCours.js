import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { FormHelperText, Grid, Button, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { AjouterCours } from 'Redux/Cours';
import { CreateContexte } from 'Context';

// project import

// assets

// ============================|| FIREBASE - LOGIN ||============================ //
// codeClasse,
//         id,
//         branche,
//         maxima,

const AuthLogin = () => {
  const dispatch = useDispatch();
  const { showDataClasseSelect } = useContext(CreateContexte);
  return (
    <>
      <Formik
        initialValues={{
          branche: '',
          maxima: '',
          codeClasse: showDataClasseSelect
        }}
        validationSchema={Yup.object().shape({
          branche: Yup.string().max(255).required('La branche est obligatoire'),
          maxima: Yup.string().max(2).required('Le maxima est obligatoire')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values);
          try {
            dispatch(AjouterCours(values));
          } catch (error) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <OutlinedInput
                    id="branche"
                    type="text"
                    value={values.branche}
                    name="branche"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter le branche"
                    fullWidth
                    error={Boolean(touched.branche && errors.branche)}
                  />
                  {touched.branche && errors.branche && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.branche}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack>
                  <OutlinedInput
                    id="maxima"
                    type="text"
                    value={values.maxima}
                    name="maxima"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter l'maxima"
                    fullWidth
                    error={Boolean(touched.maxima && errors.maxima)}
                  />
                  {touched.maxima && errors.maxima && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.maxima}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Enregistrer
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
