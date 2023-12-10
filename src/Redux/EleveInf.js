import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post } from 'utils/Liens';

const initialState = {
  eleve: [],
  getEleve: '',
  getEleveError: '',
  postEleve: '',
  postEleveError: '',
  putEleve: '',
  putEleveError: '',
  deleteEleve: '',
  deleteEleveError: ''
};

export const readEleve = createAsyncThunk('eleve/readEleve', async (id, { rejectWithValue }) => {
  try {
    const response = await get('eleveinfo');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const postEleve = createAsyncThunk('eleve/postEleve', async (data, { rejectWithValue }) => {
  try {
    const response = await post('infoEleve', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const eleve = createSlice({
  name: 'eleve',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [readEleve.pending]: (state, action) => {
      return {
        ...state,
        getEleve: 'pending',
        getEleveError: '',
        postEleve: '',
        postEleveError: '',
        putEleve: '',
        putEleveError: '',
        deleteEleve: '',
        deleteEleveError: ''
      };
    },
    [readEleve.fulfilled]: (state, action) => {
      return {
        ...state,
        eleve: action.payload,
        getEleve: 'success',
        getEleveError: '',
        postEleve: '',
        postEleveError: '',
        putEleve: '',
        putEleveError: '',
        deleteEleve: '',
        deleteEleveError: ''
      };
    },
    [readEleve.rejected]: (state, action) => {
      return {
        ...state,
        getEleve: 'rejected',
        getEleveError: action.payload,
        postEleve: '',
        postEleveError: '',
        putEleve: '',
        putEleveError: '',
        deleteEleve: '',
        deleteEleveError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [postEleve.rejected]: (state, action) => {
      return {
        ...state,
        getEleve: '',
        getEleveError: '',
        postEleve: 'pending',
        postEleveError: '',
        putEleve: '',
        putEleveError: '',
        deleteEleve: '',
        deleteEleveError: ''
      };
    },
    [postEleve.fulfilled]: (state, action) => {
      return {
        ...state,
        eleve: [action.payload, ...state.eleve],
        getEleve: '',
        getEleveError: '',
        postEleve: 'success',
        postEleveError: '',
        putEleve: '',
        putEleveError: '',
        deleteEleve: '',
        deleteEleveError: ''
      };
    },
    [postEleve.rejected]: (state, action) => {
      return {
        ...state,
        getEleve: '',
        getEleveError: '',
        postEleve: 'rejected',
        postEleveError: action.payload,
        putEleve: '',
        putEleveError: '',
        deleteEleve: '',
        deleteEleveError: ''
      };
    }

    // eslint-disable-next-line no-unused-vars
  }
});

export default eleve.reducer;
