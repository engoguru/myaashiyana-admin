import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import donationService from "./donationService";

/* GET ALL */
export const getAllDonations = createAsyncThunk(
  "donation/get-all",
  async (thunkAPI) => {
    try {
      return await donationService.getDonations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* DELETE */
export const deleteDonation = createAsyncThunk(
  "donation/delete",
  async (id, thunkAPI) => {
    try {
      return await donationService.removeDonation(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  donations: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDonations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.donations = action.payload;
      })
      .addCase(getAllDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteDonation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedDonation = action.payload;
      })
      .addCase(deleteDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default donationSlice.reducer;
