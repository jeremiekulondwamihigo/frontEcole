import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'utils/Liens';

const initialState = {
  option: [],
  addOption: '',
  addOptionError: '',
  getOption: '',
  getOptionError: '',
  updateOption: '',
  updateOptionError: ''
};

export const postClasse = createAsyncThunk('classe/postClasse', async (datas, { rejectWithValue }) => {
  try {
    const response = await post('classe', datas);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.reponse.data);
  }
});

const classe = createSlice({
  name: 'classe',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars

    // eslint-disable-next-line no-unused-vars
    [postClasse.pending]: (state, action) => {
      return {
        ...state,
        addOption: '',
        addOptionError: '',
        getOption: '',
        getOptionError: '',
        updateOption: 'pending',
        updateOptionError: ''
      };
    },
    [postClasse.fulfilled]: (state, action) => {
      let opt = state.option.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        ...state,
        option: opt,
        addOption: '',
        addOptionError: '',
        getOption: '',
        getOptionError: '',
        updateOption: 'success',
        updateOptionError: ''
      };
    },
    [postClasse.rejected]: (state, action) => {
      return {
        ...state,
        addOption: '',
        addOptionError: '',
        getOption: '',
        getOptionError: '',
        updateOption: 'rejected',
        updateOptionError: action.payload
      };
    }
  }
});
export default classe.reducer;
