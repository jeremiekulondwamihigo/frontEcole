import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post, put } from 'utils/Liens';

const initialState = {
  option: [],
  addOption: '',
  addOptionError: '',
  getOption: '',
  getOptionError: '',
  updateOption: '',
  updateOptionError: ''
};

export const postOption = createAsyncThunk('option/postOption', async (option, { rejectWithValue }) => {
  try {
    const resposne = await post('option', { option: option });
    return resposne.data;
  } catch (error) {
    return rejectWithValue(error.reponse.data);
  }
});
export const getOption = createAsyncThunk('option/getOption', async (option, { rejectWithValue }) => {
  try {
    const resposne = await get('option');
    return resposne.data;
  } catch (error) {
    return rejectWithValue(error.reponse.data);
  }
});
export const putOption = createAsyncThunk('option/putOption', async (datas, { rejectWithValue }) => {
  let { id, data } = datas;
  let donner = { id, data };
  try {
    const resposne = await put('option', donner);
    return resposne.data;
  } catch (error) {
    return rejectWithValue(error.reponse.data);
  }
});

const option = createSlice({
  name: 'option',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [postOption.pending]: (state, action) => {
      return {
        ...state,
        addOption: 'pending',
        addOptionError: '',
        getOption: '',
        getOptionError: '',
        updateOption: '',
        updateOptionError: ''
      };
    },
    [postOption.fulfilled]: (state, action) => {
      return {
        ...state,
        option: [action.payload, ...state.option],
        addOption: 'success',
        addOptionError: '',
        getOption: '',
        getOptionError: '',
        updateOption: '',
        updateOptionError: ''
      };
    },
    [postOption.rejected]: (state, action) => {
      return {
        ...state,
        addOption: 'rejected',
        addOptionError: action.payload,
        getOption: '',
        getOptionError: '',
        updateOption: '',
        updateOptionError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [getOption.pending]: (state, action) => {
      return {
        ...state,
        addOption: '',
        addOptionError: '',
        getOption: 'pending',
        getOptionError: '',
        updateOption: '',
        updateOptionError: ''
      };
    },
    [getOption.fulfilled]: (state, action) => {
      return {
        ...state,
        option: action.payload,
        addOption: '',
        addOptionError: '',
        getOption: 'success',
        getOptionError: '',
        updateOption: '',
        updateOptionError: ''
      };
    },
    [getOption.rejected]: (state, action) => {
      return {
        ...state,
        addOption: '',
        addOptionError: '',
        getOption: 'rejected',
        getOptionError: action.payload,
        updateOption: '',
        updateOptionError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [putOption.pending]: (state, action) => {
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
    [putOption.fulfilled]: (state, action) => {
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
    [putOption.rejected]: (state, action) => {
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
export default option.reducer;
