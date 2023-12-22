/* eslint-disable react/prop-types */
import React from 'react';

// material-ui
import { Grid, Button, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { useDispatch } from 'react-redux';
import { AddFrais } from 'Redux/TitleFrais';

// project import

// assets

// ============================|| FIREBASE - LOGIN ||============================ //

const AddFrai = ({ idClasse, idTitle }) => {
  const dispatch = useDispatch();
  const functionSend = (montant) => {
    dispatch(AddFrais({ montant, idClasse, idTitle }));
  };

  return (
    <>
      <Formik
        initialValues={{
          montant: ''
        }}
        validationSchema={Yup.object().shape({
          montant: Yup.string().max(3).required('Entrer le montant')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            functionSend(values.montant);
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
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <OutlinedInput
                    id="montant"
                    type="number"
                    value={values.montant}
                    name="montant"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="montant"
                    fullWidth
                    error={Boolean(touched.montant && errors.montant)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
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

export default AddFrai;
