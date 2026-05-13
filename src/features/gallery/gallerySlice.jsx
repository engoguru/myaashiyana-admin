import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import galleryService from "./galleryService";

export const createGallery = createAsyncThunk(
    "gallery/create", 
    async(galleryData, thunkAPI) => {
        try {
            await galleryService.addGallery(galleryData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getAll = createAsyncThunk(
    "gallery/get-all",
    async (thunkAPI) => {
      try {
        return await galleryService.getGallery();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSingleGallery = createAsyncThunk("gallery/get-gallery", async(id, thunkAPI) => {
    try {
        await galleryService.singleGallery(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateGallery = createAsyncThunk("gallery/update-gallery", async(galleryData, thunkAPI) => {
    try {
        await galleryService.putGallery(galleryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteGallery = createAsyncThunk("gallery/delete-gallery", async(id, thunkAPI) => {
    try {
        await galleryService.removeGallery(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
  gallerys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const gallerySlice = createSlice({
    name: "gallerys",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createGallery.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createGallery.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneGallery = action.payload;
        })
        .addCase(createGallery.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getAll.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAll.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.gallery = action.payload;
        })
        .addCase(getAll.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleGallery.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleGallery.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.gyImages = action.payload.images;
            state.gyHeading = action.payload.heading;
        })
        .addCase(getSingleGallery.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateGallery.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateGallery.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedGallery = action.payload;
        })
        .addCase(updateGallery.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteGallery.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteGallery.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedGallery = action.payload;
        })
        .addCase(deleteGallery.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default gallerySlice.reducer;


