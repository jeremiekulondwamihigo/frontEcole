import React, { useState } from 'react';

// material-ui
import { FormHelperText, Grid, Button, OutlinedInput, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { postEleve } from 'Redux/EleveInf';
import DirectionSnackbar from 'Control/Message';

// project import

// assets

// ============================|| FIREBASE - LOGIN ||============================ //
const text = [
  { id: 1, placeholder: 'Entrez le nom', value: 'nom' },
  { id: 2, placeholder: 'Entrez le postnom', value: 'postnom' },
  { id: 3, placeholder: 'Entrez le prenom', value: 'prenom' },
  { id: 4, placeholder: 'Entrez le lieu de naissance', value: 'lieu_naissance' },
  { id: 5, placeholder: 'Entrez la date de naissance', value: 'date_naissance', type: 'date' },
  { id: 6, placeholder: 'Entrez le genre; M ou F', value: 'genre' },
  { id: 7, placeholder: 'Entrez le Contact du tuteur', value: 'contactTuteur' },
  { id: 8, placeholder: 'Entrez le nom du pere', value: 'nomPere' },
  { id: 9, placeholder: 'Profession du père', value: 'professionPere' },
  { id: 10, placeholder: 'Entrez le nom de la mare', value: 'nomPere' },
  { id: 11, placeholder: 'Profession de la mère', value: 'professionMere' }
];
const NouvelleInscription = () => {
  const [open, setOpen] = useState(true);
  const eleve = useSelector((state) => state.eleveinfo);
  const dispatch = useDispatch();
  return (
    <>
      {eleve.postEleve === 'success' && <DirectionSnackbar open={open} setOpen={setOpen} message="Enregistrement effectuer" />}
      {eleve.postEleve === 'rejected' && <DirectionSnackbar open={open} setOpen={setOpen} message={eleve.postEleveError} />}
      <Formik
        initialValues={{
          contactTuteur: '',
          nom: '',
          postnom: '',
          prenom: '',
          nomPere: '',
          professionPere: '',
          nomMere: '',
          professionMere: '',
          lieu_naissance: '',
          date_naissance: '',
          genre: ''
        }}
        validationSchema={Yup.object().shape({
          nom: Yup.string().max(255).required('Le nom est obligatoire'),
          postnom: Yup.string().max(255).required('Le postnom est obligatoire'),
          prenom: Yup.string().max(255).required('Le prenom est obligatoire'),
          genre: Yup.string().max(2).required('Le genre est obligatoire'),
          lieu_naissance: Yup.string().max(255).required('le lieu de naissance est obligatoire'),
          date_naissance: Yup.string().max(255).required('La date de naissance est obligatoire')
        })}
        onSubmit={async (values, { setErrors, reset, setStatus, setSubmitting }) => {
          try {
            dispatch(postEleve(values));
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
              {text.map((index) => {
                return (
                  <Grid item xs={12} lg={6} key={index.id}>
                    <Stack spacing={1}>
                      <OutlinedInput
                        id={index.value}
                        type={index.type ? index.type : 'text'}
                        value={values['' + index.value]}
                        name={`${index.value}`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={index.placeholder}
                        fullWidth
                        error={Boolean(touched['' + index.value] && errors['' + index.value])}
                      />
                      {touched['' + index.value] && errors['' + index.value] && (
                        <FormHelperText error id={`standard-weight-helper-text${index.value}`}>
                          {errors['' + index.value]}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                );
              })}

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

export default NouvelleInscription;
