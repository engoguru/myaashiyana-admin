import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serService from "./serService";

export const createServiceThunk = createAsyncThunk(
    "service/create", 
    async(serData, thunkAPI) => {
        try {
            await serService.addServices(serData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getServiceThunk = createAsyncThunk(
    "service/get-all",
    async (thunkAPI) => {
      try {
        return await serService.allServices();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSingleServThunk = createAsyncThunk("service/get-single", async(id, thunkAPI) => {
    try {
        await serService.singleServices(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateServiceThunk = createAsyncThunk("service/update-service", async(serData, thunkAPI) => {
    try {
        await serService.putServices(serData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteServiceThunk = createAsyncThunk("service/delete-service", async(id, thunkAPI) => {
    try {
        await serService.deleteServices(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    services: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const serSlice = createSlice({
    name: "services",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createServiceThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createServiceThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneServ = action.payload;
        })
        .addCase(createServiceThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getServiceThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getServiceThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.service = action.payload;
        })
        .addCase(getServiceThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleServThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleServThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.servImg = action.payload.images;
            state.servHead = action.payload.heading;
            state.servCont = action.payload.content;
        })
        .addCase(getSingleServThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateServiceThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateServiceThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedServ = action.payload;
        })
        .addCase(updateServiceThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteServiceThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteServiceThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedServ = action.payload;
        })
        .addCase(deleteServiceThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default serSlice.reducer;