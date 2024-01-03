import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'utils/Liens';

const initialState = {
  classe: [],
  getClasse: '',
  getClasseError: ''
};

export const readClasses = createAsyncThunk('classeAll/readClasses', async (id, { rejectWithValue }) => {
  try {
    const response = await get('readAllClasse');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.reponse.data);
  }
});

const classeAll = createSlice({
  name: 'classeAll',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars

    // eslint-disable-next-line no-unused-vars
    [readClasses.pending]: (state, action) => {
      return {
        ...state,
        getClasse: 'pending',
        getClasseError: ''
      };
    },
    [readClasses.fulfilled]: (state, action) => {
      return {
        ...state,
        classe: action.payload,
        getClasse: '',
        getClasseError: ''
      };
    },
    [readClasses.rejected]: (state, action) => {
      return {
        ...state,
        getClasse: 'rejected',
        getClasseError: action.payload
      };
    }
  }
});
export default classeAll.reducer;
