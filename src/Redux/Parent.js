import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post, put } from 'utils/Liens';

const initialState = {
  parent: [],
  getParent: '',
  getParentError: '',
  postParent: '',
  postParentError: '',
  putParent: '',
  putParentError: ''
};

export const readParent = createAsyncThunk('parent/readParent', async (id, { rejectWithValue }) => {
  try {
    const reponse = await get('parent');
    return reponse.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const postParent = createAsyncThunk('parent/postParent', async (data, { rejectWithValue }) => {
  try {
    const reponse = await post('parent', data);
    return reponse.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const putParent = createAsyncThunk('parent/putParent', async (datas, { rejectWithValue }) => {
  const { id, data } = datas;
  try {
    const reponse = await put('parent', { id, data });
    return reponse.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const parent = createSlice({
  name: 'parent',
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
        postParentError: '',
        putParent: '',
        putParentError: ''
      };
    },
    [readParent.fulfilled]: (state, action) => {
      return {
        ...state,
        parent: action.payload,
        getParent: 'success',
        getParentError: '',
        postParent: '',
        postParentError: '',
        putParent: '',
        putParentError: ''
      };
    },
    [readParent.rejected]: (state, action) => {
      return {
        ...state,
        getParent: 'rejected',
        getParentError: action.payload,
        postParent: '',
        postParentError: '',
        putParent: '',
        putParentError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [postParent.pending]: (state, action) => {
      return {
        ...state,
        getParent: '',
        getParentError: '',
        postParent: 'pending',
        postParentError: '',
        putParent: '',
        putParentError: ''
      };
    },
    [postParent.fulfilled]: (state, action) => {
      return {
        ...state,
        parent: [action.payload, ...state.parent],
        getParent: '',
        getParentError: '',
        postParent: 'success',
        postParentError: '',
        putParent: '',
        putParentError: ''
      };
    },
    [postParent.rejected]: (state, action) => {
      return {
        ...state,
        getParent: '',
        getParentError: '',
        postParent: 'rejected',
        postParentError: action.payload,
        putParent: '',
        putParentError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [putParent.pending]: (state, action) => {
      return {
        ...state,
        getParent: '',
        getParentError: '',
        postParent: '',
        postParentError: '',
        putParent: '',
        putParentError: ''
      };
    },
    [putParent.fulfilled]: (state, action) => {
      let parent = state.parent.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        ...state,
        parent: parent,
        getParent: '',
        getParentError: '',
        postParent: '',
        postParentError: '',
        putParent: '',
        putParentError: ''
      };
    },
    [putParent.rejected]: (state, action) => {
      return {
        ...state,
        getParent: '',
        getParentError: '',
        postParent: '',
        postParentError: '',
        putParent: 'rejected',
        putParentError: action.payload
      };
    }
  }
});
export default parent.reducer;
