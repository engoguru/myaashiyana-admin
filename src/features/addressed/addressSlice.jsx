import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addressService from "./addressService";

export const createAddress = createAsyncThunk(
    "addressed/create", 
    async(addressData, thunkAPI) => {
        try {
            await addressService.addAddress(addressData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getAddress = createAsyncThunk(
    "addressed/get-all",
    async (thunkAPI) => {
      try {
        return await addressService.allAddress();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSingleAddress = createAsyncThunk("addressed/get-single", async(id, thunkAPI) => {
    try {
        await addressService.singleAddress(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateAddress = createAsyncThunk("addressed/update-addressed", async(addressData, thunkAPI) => {
    try {
        await addressService.putAddress(addressData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deletedAddress = createAsyncThunk("addressed/delete-addressed", async(id, thunkAPI) => {
    try {
        await addressService.deleteAddress(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    addresses: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const addressSlice = createSlice({
    name: "addresses",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createAddress.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createAddress.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneAddress = action.payload;
        })
        .addCase(createAddress.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAddress.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.address = action.payload;
        })
        .addCase(getAddress.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleAddress.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.addTitle = action.payload.title;
        })
        .addCase(getSingleAddress.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateAddress.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedAddress = action.payload;
        })
        .addCase(updateAddress.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deletedAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletedAddress.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedAddress = action.payload;
        })
        .addCase(deletedAddress.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default addressSlice.reducer;