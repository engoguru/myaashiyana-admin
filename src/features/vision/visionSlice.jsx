
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import visionService from "./visionService";

export const createdVisionThunk = createAsyncThunk(
    "vision/create", 
    async(visData, thunkAPI) => {
        try {
            await visionService.addVision(visData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getVisionThunk = createAsyncThunk(
    "vision/get-all",
    async (thunkAPI) => {
      try {
        return await visionService.allVision();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const getSingleVisionThunk = createAsyncThunk("vision/get-single", async(id, thunkAPI) => {
    try {
        await visionService.singleVision(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateVisionThunk = createAsyncThunk("vision/update-vision", async(visData, thunkAPI) => {
    try {
        await visionService.putVision(visData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deletedVisionThunk = createAsyncThunk("vision/delete-vision", async(id, thunkAPI) => {
    try {
        await visionService.deleteVision(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    visions: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const visionSlice = createSlice({
    name: "visions",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createdVisionThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createdVisionThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneVision = action.payload;
        })
        .addCase(createdVisionThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getVisionThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getVisionThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.vision = action.payload;
        })
        .addCase(getVisionThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleVisionThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleVisionThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.visImg = action.payload.images;
            state.visCont = action.payload.content;
        })
        .addCase(getSingleVisionThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateVisionThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateVisionThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedVision = action.payload;
        })
        .addCase(updateVisionThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deletedVisionThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletedVisionThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedVision = action.payload;
        })
        .addCase(deletedVisionThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default visionSlice.reducer;