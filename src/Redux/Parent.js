import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post } from 'utils/Liens';

const initialState = {
  parent: [],
  getParent: [],
  getParentError: '',
  postParent: '',
  postParentError: ''
};

export const readParent = createAsyncThunk('parent/readParent', async (id, { rejectWithValue }) => {
  try {
    const reponse = await get('parent');
    return reponse.data;
  } catch (error) {
    return rejectWithValue(error.data.response);
  }
});
export const postParent = createAsyncThunk('parent/readParent', async (data, { rejectWithValue }) => {
  try {
    const reponse = await post('parent', data);
    return reponse.data;
  } catch (error) {
    return rejectWithValue(error.data.response);
  }
});

const parent = createSlice({
  name: 'eleve',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [readParent.pending]: (state, action) => {
      return {
        ...state,
        getParent: 'pending',
        getParentError: '',
        postParent: '',
        postParentError: ''
      };
    },
    [readParent.fulfilled]: (state, action) => {
      return {
        ...state,
        parent: action.payload,
        getParent: 'success',
        getParentError: '',
        postParent: '',
        postParentError: ''
      };
    },
    [readParent.rejected]: (state, action) => {
      return {
        ...state,
        getParent: 'rejected',
        getParentError: action.payload,
        postParent: '',
        postParentError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [postParent.pending]: (state, action) => {
      return {
        ...state,
        getParent: '',
        getParentError: '',
        postParent: 'pending',
        postParentError: ''
      };
    },
    [postParent.fulfilled]: (state, action) => {
      return {
        ...state,
        parent: [action.payload, ...state.parent],
        getParent: '',
        getParentError: '',
        postParent: 'success',
        postParentError: ''
      };
    },
    [postParent.rejected]: (state, action) => {
      return {
        ...state,
        getParent: '',
        getParentError: '',
        postParent: 'rejected',
        postParentError: action.payload
      };
    }
  }
});
export default parent.reducer;
