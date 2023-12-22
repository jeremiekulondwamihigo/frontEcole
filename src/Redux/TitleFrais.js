import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, post } from 'utils/Liens';

const initialState = {
  title: [],
  addTitle: '',
  addTitleError: '',
  getTitle: '',
  getTitleError: '',
  putTitle: '',
  putTitleError: '',
  deleteTitle: '',
  deleteTitleError: ''
};

export const AddTitle = createAsyncThunk('titleFrais/addTitle', async (data, { rejectWithValue }) => {
  try {
    const reponse = await post('titreFrais', data);
    return reponse.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const ReadTitle = createAsyncThunk('titleFrais/ReadTitle', async (_data, { rejectWithValue }) => {
  try {
    const reponse = await get('titleFrais');
    return reponse.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const AddFrais = createAsyncThunk('titleFrais/AddFrais', async (data, { rejectWithValue }) => {
  try {
    const reponse = await post('frais', data);
    return reponse.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const titleFrais = createSlice({
  name: 'titleFrais',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [AddTitle.pending]: (state, _action) => {
      return {
        ...state,
        addTitle: 'pending',
        addTitleError: '',
        getTitle: '',
        getTitleError: '',
        putTitle: '',
        putTitleError: '',
        deleteTitle: '',
        deleteTitleError: ''
      };
    },
    [AddTitle.fulfilled]: (state, action) => {
      return {
        ...state,
        title: [...state.title, action.payload],
        addTitle: 'success',
        addTitleError: '',
        getTitle: '',
        getTitleError: '',
        putTitle: '',
        putTitleError: '',
        deleteTitle: '',
        deleteTitleError: ''
      };
    },
    [AddTitle.rejected]: (state, action) => {
      return {
        ...state,
        addTitle: 'rejected',
        addTitleError: action.payload,
        getTitle: '',
        getTitleError: '',
        putTitle: '',
        putTitleError: '',
        deleteTitle: '',
        deleteTitleError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [ReadTitle.pending]: (state, action) => {
      return {
        ...state,
        addTitle: '',
        addTitleError: '',
        getTitle: 'pending',
        getTitleError: '',
        putTitle: '',
        putTitleError: '',
        deleteTitle: '',
        deleteTitleError: ''
      };
    },
    [ReadTitle.fulfilled]: (state, action) => {
      return {
        ...state,
        title: action.payload,
        addTitle: '',
        addTitleError: '',
        getTitle: 'success',
        getTitleError: '',
        putTitle: '',
        putTitleError: '',
        deleteTitle: '',
        deleteTitleError: ''
      };
    },
    [ReadTitle.rejected]: (state, action) => {
      return {
        ...state,
        addTitle: '',
        addTitleError: '',
        getTitle: 'rejected',
        getTitleError: action.payload,
        putTitle: '',
        putTitleError: '',
        deleteTitle: '',
        deleteTitleError: ''
      };
    },
    // eslint-disable-next-line no-unused-vars
    [AddFrais.pending]: (state, action) => {
      return {
        ...state,
        addTitle: '',
        addTitleError: '',
        getTitle: '',
        getTitleError: '',
        putTitle: 'pending',
        putTitleError: '',
        deleteTitle: '',
        deleteTitleError: ''
      };
    },
    [AddFrais.fulfilled]: (state, action) => {
      let frais = state.title.map((x) => (x._id === action.payload._id ? action.payload : x));
      return {
        ...state,
        title: frais,
        addTitle: '',
        addTitleError: '',
        getTitle: '',
        getTitleError: '',
        putTitle: 'success',
        putTitleError: '',
        deleteTitle: '',
        deleteTitleError: ''
      };
    },
    [AddFrais.rejected]: (state, action) => {
      return {
        ...state,
        addTitle: '',
        addTitleError: '',
        getTitle: '',
        getTitleError: '',
        putTitle: 'rejected',
        putTitleError: action.payload,
        deleteTitle: '',
        deleteTitleError: ''
      };
    }
  }
});
export default titleFrais.reducer;
