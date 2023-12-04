/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post, put } from 'utils/Liens';
import _ from 'lodash';

const initialState = {
  annee: [],
  addAnnee: '',
  addAnneeError: '',
  getAnnee: '',
  getAnneeError: '',
  desactiver: '',
  desactiverError: ''
};
export const readAllYear = createAsyncThunk('annee/readAllYear', async (id, { rejectWithValue }) => {
  try {
    const response = await get('annee');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const AjouterAnnee = createAsyncThunk('annee/AjouterAnnee', async (data, { rejectWithValue }) => {
  try {
    const response = await post('annee', { annee: data });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const DesactiverAnnee = createAsyncThunk('annee/DesactiverAnnee', async (data, { rejectWithValue }) => {
  const { valeur, id } = data;
  try {
    const response = await put('annee/' + id, { valeur: valeur });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const annee = createSlice({
  name: 'annee',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [readAllYear.pending]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        getAnnee: 'pending',
        getAnneeError: '',
        desactiver: '',
        desactiverError: ''
      };
    },
    [readAllYear.fulfilled]: (state, action) => {
      return {
        ...state,
        annee: action.payload,
        addAnnee: '',
        addAnneeError: '',
        getAnnee: 'success',
        getAnneeError: '',
        desactiver: '',
        desactiverError: ''
      };
    },
    [readAllYear.rejected]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        getAnnee: 'rejected',
        getAnneeError: action.payload,
        desactiver: '',
        desactiverError: ''
      };
    },
    [AjouterAnnee.pending]: (state, action) => {
      return {
        ...state,
        addAnnee: 'pending',
        addAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
        desactiver: '',
        desactiverError: ''
      };
    },
    [AjouterAnnee.fulfilled]: (state, action) => {
      return {
        ...state,
        annee: [action.payload, ...state.annee],
        addAnnee: 'success',
        addAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
        desactiver: '',
        desactiverError: ''
      };
    },
    [AjouterAnnee.rejected]: (state, action) => {
      return {
        ...state,
        addAnnee: 'rejected',
        addAnneeError: action.payload,
        getAnnee: '',
        getAnneeError: '',
        desactiver: '',
        desactiverError: ''
      };
    },
    [DesactiverAnnee.pending]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
        desactiver: 'pending',
        desactiverError: ''
      };
    },
    [DesactiverAnnee.fulfilled]: (state, action) => {
      const updatings = state.annee.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        ...state,
        annee: updatings,
        addAnnee: '',
        addAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
        desactiver: 'success',
        desactiverError: ''
      };
    },
    [DesactiverAnnee.rejected]: (state, action) => {
      return {
        ...state,
        addAnnee: '',
        addAnneeError: '',
        getAnnee: '',
        getAnneeError: '',
        desactiver: 'rejected',
        desactiverError: action.payload
      };
    }
  }
});

export default annee.reducer;
