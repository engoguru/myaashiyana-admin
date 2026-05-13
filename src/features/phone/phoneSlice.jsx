import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import phoneService from "./phoneService";

export const createPhone = createAsyncThunk(
    "phones/create", 
    async(phonesData, thunkAPI) => {
        try {
            await phoneService.addPhones(phonesData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getPhone = createAsyncThunk(
    "phones/get-all",
    async (thunkAPI) => {
      try {
        return await phoneService.allPhones();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSinglePhone = createAsyncThunk("phones/get-single", async(id, thunkAPI) => {
    try {
        await phoneService.singlePhones(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updatePhone = createAsyncThunk("phones/update-phones", async(phonesData, thunkAPI) => {
    try {
        await phoneService.putPhones(phonesData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deletePhone = createAsyncThunk("phones/delete-phones", async(id, thunkAPI) => {
    try {
        await phoneService.deletePhones(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    phones: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const phoneSlice = createSlice({
    name: "phones",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createPhone.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createPhone.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.donePhone = action.payload;
        })
        .addCase(createPhone.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getPhone.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getPhone.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.phone = action.payload;
        })
        .addCase(getPhone.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSinglePhone.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSinglePhone.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.phTitle = action.payload.title;
        })
        .addCase(getSinglePhone.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updatePhone.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updatePhone.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedPhone = action.payload;
        })
        .addCase(updatePhone.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deletePhone.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletePhone.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedPhone = action.payload;
        })
        .addCase(deletePhone.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default phoneSlice.reducer;