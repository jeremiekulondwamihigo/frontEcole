/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'utils/Liens';

const initialState = {
  user: [],
  getUser: '',
  getUserError: ''
};

export const readUser = createAsyncThunk('getUser/readuser', async (token, { rejectWithValue }) => {
  try {
    const response = await get('user');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userConnect = createSlice({
  name: 'getUser',
  initialState,
  reducers: {},
  extraReducers: {
    [readUser.pending]: (state, action) => {
      return {
        ...state,
        getUser: 'pending',
        getUserError: ''
      };
    },
    [readUser.fulfilled]: (state, action) => {
      return {
        ...state,
        user: action.payload,
        getUser: 'success',
        getUserError: ''
      };
    },
    [readUser.rejected]: (state, action) => {
      return {
        ...state,
        getUser: 'rejected',
        getUserError: action.payload
      };
    }
  }
});

export default userConnect.reducer;
