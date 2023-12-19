import React from 'react';

// material-ui
import { FormHelperText, Grid, Button, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { dispatch } from 'store/index';
import { postParent } from 'Redux/Parent';

// project import

// assets

// ============================|| FIREBASE - LOGIN ||============================ //

const Formulaire = () => {
  return (
    <>
      <Formik
        initialValues={{
          nom: '',
          telephone: '',
          submit: null,
          status: 'parent'
        }}
        validationSchema={Yup.object().shape({
          nom: Yup.string().max(255).required('Entrez le nom complet'),
          //   telephone: Yup.number().max(9).required('Le numero doit contenir 9 chiffres')
          telephone: Yup.string().length(9, 'Le numero doit contenir 9 chiffres!')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            dispatch(postParent(values));
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
                    id="nom"
                    type="text"
                    value={values.nom}
                    name="nom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Entez le nom complet"
                    fullWidth
                    error={Boolean(touched.nom && errors.nom)}
                  />
                  {touched.nom && errors.nom && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.nom}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack>
                  <OutlinedInput
                    id="telephone"
                    type="number"
                    value={values.telephone}
                    name="telephone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Entez le numero de téléphone"
                    fullWidth
                    error={Boolean(touched.telephone && errors.telephone)}
                  />
                  {touched.telephone && errors.telephone && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.telephone}
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

export default Formulaire;
