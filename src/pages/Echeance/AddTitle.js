import React from 'react';

// material-ui
import { FormHelperText, Grid, Button, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { useDispatch } from 'react-redux';
import { AddTitle } from 'Redux/TitleFrais';

// project import

// assets

// ============================|| FIREBASE - LOGIN ||============================ //

const AddTitles = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Formik
        initialValues={{
          title: '',
          debut: '',
          fin: ''
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255).required('Le titre est obligatoire'),
          debut: Yup.string().max(255).required('Le début du recouvrement est obligatoire'),
          fin: Yup.string().max(255).required('La fin du recourevrement est obligatoire')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            dispatch(AddTitle(values));
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
                    id="title"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter le frais"
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                  />
                  {touched.title && errors.title && (
                    <FormHelperText error id="standard-weight-helper-text-title">
                      {errors.title}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack>
                  <OutlinedInput
                    id="debut"
                    type="date"
                    value={values.debut}
                    name="debut"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Début"
                    fullWidth
                    error={Boolean(touched.debut && errors.debut)}
                  />
                  {touched.debut && errors.debut && (
                    <FormHelperText error id="standard-weight-helper-text-debut">
                      {errors.debut}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack>
                  <OutlinedInput
                    id="fin"
                    type="date"
                    value={values.fin}
                    name="fin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="fin"
                    fullWidth
                    error={Boolean(touched.fin && errors.fin)}
                  />
                  {touched.fin && errors.fin && (
                    <FormHelperText error id="standard-weight-helper-text-fin">
                      {errors.fin}
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

export default AddTitles;
