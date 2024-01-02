import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post, put } from 'utils/Liens';

const initialState = {
  inscrit: [],
  postInscrit: '',
  postInscritError: '',
  getInscrit: '',
  getInscritError: '',
  putInscrit: '',
  putInscritError: ''
};
export const AjouterInscrit = createAsyncThunk('inscrit/AjouterInscrit', async (data, { rejectWithValue }) => {
  try {
    const response = await post('inscription', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const readInscrit = createAsyncThunk('inscrit/readInscrit', async (id, { rejectWithValue }) => {
  try {
    const response = await get('inscrit');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const putEleve = createAsyncThunk('inscrit/putEleve', async (datas, { rejectWithValue }) => {
  try {
    let { id, data, lien } = datas;
    const response = await put(lien ? lien :'infoEleveWeb', { id, data });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const inscrit = createSlice({
  name: 'inscrit',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [readInscrit.pending]: (state, action) => {
      return {
        ...state,
        postInscrit: '',
        postInscritError: '',
        getInscrit: 'pending',
        getInscritError: '',
        putInscrit: '',
        putInscritError: ''
      };
    },
    [readInscrit.fulfilled]: (state, action) => {
      return {
        ...state,
        inscrit: action.payload,
        postInscrit: '',
        postInscritError: '',
        getInscrit: 'success',
        getInscritError: '',
        putInscrit: '',
        putInscritError: ''
      };
    },
    [readInscrit.rejected]: (state, action) => {
      return {
        ...state,
        postInscrit: '',
        postInscritError: '',
        getInscrit: 'rejected',
        getInscritError: action.payload,
        putInscrit: '',
        putInscritError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [AjouterInscrit.pending]: (state, action) => {
      return {
        ...state,
        postInscrit: 'pending',
        postInscritError: '',
        getInscrit: '',
        getInscritError: '',
        putInscrit: '',
        putInscritError: ''
      };
    },
    [AjouterInscrit.fulfilled]: (state, action) => {
      return {
        ...state,
        inscrit: [action.payload, ...state.inscrit],
        postInscrit: 'success',
        postInscritError: '',
        getInscrit: '',
        getInscritError: '',
        putInscrit: '',
        putInscritError: ''
      };
    },
    [AjouterInscrit.rejected]: (state, action) => {
      return {
        ...state,
        postInscrit: 'rejected',
        postInscritError: action.payload,
        getInscrit: '',
        getInscritError: '',
        putInscrit: '',
        putInscritError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [putEleve.pending]: (state, action) => {
      return {
        ...state,
        postInscrit: '',
        postInscritError: '',
        getInscrit: '',
        getInscritError: '',
        putInscrit: 'pending',
        putInscritError: ''
      };
    },
    [putEleve.fulfilled]: (state, action) => {
      let eleve = state.inscrit.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        ...state,
        inscrit: eleve,
        postInscrit: '',
        postInscritError: '',
        getInscrit: '',
        getInscritError: '',
        putInscrit: 'success',
        putInscritError: ''
      };
    },
    [putEleve.rejected]: (state, action) => {
      return {
        ...state,
        postInscrit: '',
        postInscritError: '',
        getInscrit: '',
        getInscritError: '',
        putInscrit: 'rejected',
        putInscritError: action.payload
      };
    }
    // eslint-disable-next-line no-unused-vars
  }
});

export default inscrit.reducer;
