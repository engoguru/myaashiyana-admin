// features/membership/membershipSlice.js
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memberFormService from "./membershipservices";

export const getAllQuery = createAsyncThunk(
  "memberForm/get-all",
  async (_, thunkAPI) => {
    try {
      return await memberFormService.allMember();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSingleQuery = createAsyncThunk(
  "memberForm/get-single",
  async (id, thunkAPI) => {
    try {
      return await memberFormService.singleMember(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteQuery = createAsyncThunk(
  "memberForm/delete",
  async (id, thunkAPI) => {
    try {
      return await memberFormService.removeMember(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  memberForm: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const contactFormSlice = createSlice({
  name: "memberForm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.memberForm = action.payload;
      })
      .addCase(getAllQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getSingleQuery.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(getSingleQuery.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteQuery.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(deleteQuery.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(resetState, () => initialState);
  },
});

export default contactFormSlice.reducer;
