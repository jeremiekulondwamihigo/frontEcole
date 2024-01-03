/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post, put } from 'utils/Liens';

const initialState = {
  recouvrement: [],
  addRecouvrement: '',
  addRecouvrementError: '',
  readRecouvrement: '',
  readRecouvrementError: '',
  updateRecouvrement: '',
  updateRecouvrementError: ''
};
export const readRecouvrements = createAsyncThunk('recouvrement/readRecouvrements', async (id, { rejectWithValue }) => {
  try {
    const response = await get(`setrecouvrements`);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(error.response.data);
  }
});
export const AddRecouvrements = createAsyncThunk('recouvrement/AddRecouvrements', async (data, { rejectWithValue }) => {
  try {
    const response = await post('setRecouvrement', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const UpdateRecouvrementSet = createAsyncThunk('recouvrement/UpdateRecouvrementSet', async (data, { rejectWithValue }) => {
  try {
    const response = await put('updateRecouvrement', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const recouvrement = createSlice({
  name: 'recouvrement',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [readRecouvrements.pending]: (state, action) => {
      return {
        ...state,
        addRecouvrement: '',
        addRecouvrementError: '',
        readRecouvrement: 'pending',
        readRecouvrementError: '',
        updateRecouvrement: '',
        updateRecouvrementError: ''
      };
    },
    [readRecouvrements.fulfilled]: (state, action) => {
      return {
        ...state,
        recouvrement: action.payload,
        addRecouvrement: '',
        addRecouvrementError: '',
        readRecouvrement: 'success',
        readRecouvrementError: '',
        updateRecouvrement: '',
        updateRecouvrementError: ''
      };
    },
    [readRecouvrements.rejected]: (state, action) => {
      return {
        ...state,
        addRecouvrement: '',
        addRecouvrementError: '',
        readRecouvrement: 'rejected',
        readRecouvrementError: action.payload,
        updateRecouvrement: '',
        updateRecouvrementError: ''
      };
    },
    [AddRecouvrements.pending]: (state, action) => {
      return {
        ...state,
        addRecouvrement: 'pending',
        addRecouvrementError: '',
        readRecouvrement: '',
        readRecouvrementError: '',
        updateRecouvrement: '',
        updateRecouvrementError: ''
      };
    },
    [AddRecouvrements.fulfilled]: (state, action) => {
      return {
        ...state,
        recouvrement: [action.payload, ...state.recouvrement],
        addRecouvrement: 'success',
        addRecouvrementError: '',
        readRecouvrement: '',
        readRecouvrementError: '',
        updateRecouvrement: '',
        updateRecouvrementError: ''
      };
    },
    [AddRecouvrements.rejected]: (state, action) => {
      return {
        ...state,
        addRecouvrement: 'rejected',
        addRecouvrementError: action.payload,
        readRecouvrement: '',
        readRecouvrementError: '',
        updateRecouvrement: '',
        updateRecouvrementError: ''
      };
    },
    [UpdateRecouvrementSet.pending]: (state, action) => {
      return {
        ...state,
        addRecouvrement: '',
        addRecouvrementError: '',
        readRecouvrement: '',
        readRecouvrementError: '',
        updateRecouvrement: 'pending',
        updateRecouvrementError: ''
      };
    },
    [UpdateRecouvrementSet.fulfilled]: (state, action) => {
      const updatings = state.recouvrement.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        ...state,
        recouvrement: updatings,
        addRecouvrement: '',
        addRecouvrementError: '',
        readRecouvrement: '',
        readRecouvrementError: '',
        updateRecouvrement: 'success',
        updateRecouvrementError: ''
      };
    },
    [UpdateRecouvrementSet.rejected]: (state, action) => {
      return {
        ...state,
        addRecouvrement: '',
        addRecouvrementError: '',
        readRecouvrement: '',
        readRecouvrementError: '',
        updateRecouvrement: 'rejected',
        updateRecouvrementError: action.payload
      };
    }
  }
});

export default recouvrement.reducer;
