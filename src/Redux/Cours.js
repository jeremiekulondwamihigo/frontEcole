import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post, put } from 'utils/Liens';

const initialState = {
  cours: [],
  readcours: '',
  readcoursError: '',
  addcours: '',
  addcoursError: '',
  updatecours: '',
  updatecoursError: ''
};

export const readCours = createAsyncThunk('cours/readCours', async (id, { rejectWithValue }) => {
  try {
    const response = await get('cours');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const AjouterCours = createAsyncThunk('cours/AjouterCours', async (data, { rejectWithValue }) => {
  try {
    const response = await post('cours', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const updateCours = createAsyncThunk('cours/updateCours', async (datas, { rejectWithValue }) => {
  const { id, data } = datas;
  try {
    const response = await put('cours', { id, data });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const cours = createSlice({
  name: 'cours',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [readCours.pending]: (state, action) => {
      return {
        ...state,
        readcours: 'pending',
        readcoursError: '',
        addcours: '',
        addcoursError: '',
        updatecours: '',
        updatecoursError: ''
      };
    },
    [readCours.fulfilled]: (state, action) => {
      return {
        ...state,
        cours: action.payload,
        readcours: 'success',
        readcoursError: '',
        addcours: '',
        addcoursError: '',
        updatecours: '',
        updatecoursError: ''
      };
    },
    [readCours.rejected]: (state, action) => {
      return {
        ...state,
        readcours: 'rejected',
        readcoursError: action.payload,
        addcours: '',
        addcoursError: '',
        updatecours: '',
        updatecoursError: ''
      };
    },

    // eslint-disable-next-line no-unused-vars
    [AjouterCours.pending]: (state, action) => {
      return {
        ...state,
        readcours: '',
        readcoursError: '',
        addcours: 'pending',
        addcoursError: '',
        updatecours: '',
        updatecoursError: ''
      };
    },
    [AjouterCours.fulfilled]: (state, action) => {
      return {
        ...state,
        cours: [action.payload, ...state.cours],
        readcours: '',
        readcoursError: '',
        addcours: 'success',
        addcoursError: '',
        updatecours: '',
        updatecoursError: ''
      };
    },
    [AjouterCours.rejected]: (state, action) => {
      return {
        ...state,
        readcours: '',
        readcoursError: '',
        addcours: 'rejected',
        addcoursError: action.payload,
        updatecours: '',
        updatecoursError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [updateCours.rejected]: (state, action) => {
      return {
        ...state,
        readcours: '',
        readcoursError: '',
        addcours: '',
        addcoursError: '',
        updatecours: 'pending',
        updatecoursError: ''
      };
    },
    [updateCours.fulfilled]: (state, action) => {
      const updatings = state.cours.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        ...state,
        cours: updatings,
        readcours: '',
        readcoursError: '',
        addcours: '',
        addcoursError: '',
        updatecours: 'success',
        updatecoursError: ''
      };
    },
    [updateCours.rejected]: (state, action) => {
      return {
        ...state,
        readcours: '',
        readcoursError: '',
        addcours: '',
        addcoursError: '',
        updatecours: 'rejected',
        updatecoursError: action.payload
      };
    }
  }
});

export default cours.reducer;
