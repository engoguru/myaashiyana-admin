import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactFormService from "./contactFormService";

export const getAllQuery = createAsyncThunk(
  "conQuery/get-all",
  async (thunkAPI) => {
    try {
      return await contactFormService.allContact();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleQuery = createAsyncThunk("conQuery/get-single", async(id, thunkAPI) => {
  try {
      await contactFormService.singleContact(id);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});


export const deleteQuery = createAsyncThunk("conQuery/delete-conQuery", async(id, thunkAPI) => {
  try {
      await contactFormService.removeContact(id);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
})

export const resetState = createAction("Reset_all");

const initialState = {
  contactForms: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const contactFormSlice = createSlice({
    name: "contactForms",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
      builder
      .addCase(getAllQuery.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(getAllQuery.fulfilled, (state, action) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.contactQuery = action.payload;
      })
      .addCase(getAllQuery.rejected,(state, action) => {
          state.message = action.error;
          state.isError = true;
      })
      .addCase(getSingleQuery.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(getSingleQuery.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.conQueryName = action.payload.name;
          state.conQueryPhone = action.payload.phone;
          state.conQueryEmail = action.payload.email;
          state.conQueryMessage = action.payload.message;
      })
      .addCase(getSingleQuery.rejected, (state, action) => {
          state.isError = true;
          state.message = action.error;
      })
      .addCase(deleteQuery.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(deleteQuery.fulfilled, (state,action) => {
          state.isSuccess = true;
          state.deletedconQuery = action.payload;
      })
      .addCase(deleteQuery.rejected, (state, action) => {
          state.isError = true;
          state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
})

export default contactFormSlice.reducer;