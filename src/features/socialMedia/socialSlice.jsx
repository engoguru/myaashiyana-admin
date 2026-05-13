import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socialService from "./socialService";

export const createSocMediaThunk = createAsyncThunk(
    "socMedia/create",
    async(socMediaData, thunkAPI) => {
        try {
            await socialService.addSocMedia(socMediaData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getSocMediaThunk = createAsyncThunk(
    "socMedia/get-all",
    async (thunkAPI) => {
      try {
        return await socialService.allSocMedia();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSingleSocMediaThunk = createAsyncThunk("socMedia/get-single", async(id, thunkAPI) => {
    try {
        await socialService.singleSocMedia(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateSocMediaThunk = createAsyncThunk("socMedia/update-socMedia", async(socMediaData, thunkAPI) => {
    try {
        await socialService.putSocMedia(socMediaData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteSocMediaThunk = createAsyncThunk("socMedia/delete-socMedia", async(id, thunkAPI) => {
    try {
        await socialService.deleteSocMedia(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
  socMedias: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const socialSlice = createSlice({
    name: "socMedias",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createSocMediaThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createSocMediaThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneSocMedia = action.payload;
        })
        .addCase(createSocMediaThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getSocMediaThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSocMediaThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.socMedia = action.payload;
        })
        .addCase(getSocMediaThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleSocMediaThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleSocMediaThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.socFacebook = action.payload.facebook;
            state.socInsta = action.payload.instagram;
            state.socYoutube = action.payload.youtube;
            state.socTwitter = action.payload.twitter;
        })
        .addCase(getSingleSocMediaThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateSocMediaThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateSocMediaThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedSocMedia = action.payload;
        })
        .addCase(updateSocMediaThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteSocMediaThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteSocMediaThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedSocMedia = action.payload;
        })
        .addCase(deleteSocMediaThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default socialSlice.reducer;