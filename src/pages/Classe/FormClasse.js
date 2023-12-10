/* eslint-disable react/prop-types */
import React from 'react';
// material-ui
import { FormHelperText, Grid, Button, OutlinedInput, Stack } from '@mui/material';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { postClasse } from 'Redux/Option';
import { useDispatch } from 'react-redux';
// project import
// assets
// ============================|| FIREBASE - LOGIN ||============================ //
const FormClasse = ({ codeOption }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Formik
        initialValues={{
          niveau: '',
          indexe: '',
          titulaire: ''
        }}
        validationSchema={Yup.object().shape({
          niveau: Yup.string().max(1).required('Level is required'),
          indexe: Yup.string().max(1).required("L'indexe est obligatoire"),
          titulaire: Yup.string().max(255).required('Selectionnez le titulaire de la classe')
        })}
        onSubmit={async (values, { setErrors, setStatus, reset, setSubmitting }) => {
          try {
            const data = {
              niveau: values.niveau,
              codeOption,
              indexe: values.indexe,
              titulaire: values.titulaire
            };
            dispatch(postClasse(data));
            reset();
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
                    id="niveau"
                    type="text"
                    value={values.niveau}
                    name="niveau"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter le niveau"
                    fullWidth
                    error={Boolean(touched.niveau && errors.niveau)}
                  />
                  {touched.niveau && errors.niveau && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.niveau}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack>
                  <OutlinedInput
                    id="indexe"
                    type="text"
                    value={values.indexe}
                    name="indexe"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter l'indexe"
                    fullWidth
                    error={Boolean(touched.indexe && errors.indexe)}
                  />
                  {touched.indexe && errors.indexe && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.indexe}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack>
                  <OutlinedInput
                    id="indexe"
                    type="text"
                    value={values.titulaire}
                    name="titulaire"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Titulaire"
                    fullWidth
                    error={Boolean(touched.titulaire && errors.titulaire)}
                  />
                  {touched.titulaire && errors.titulaire && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.titulaire}
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
    </div>
  );
};
export default FormClasse;
