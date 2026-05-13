import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import aboutContService from "./aboutContService";


export const createaboutThunk = createAsyncThunk(
    "about/create", 
    async(aboutData, thunkAPI) => {
        try {
            await aboutContService.addabout(aboutData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getaboutThunk = createAsyncThunk(
    "about/get-all",
    async (thunkAPI) => {
      try {
        return await aboutContService.getabout();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSingleaboutThunk = createAsyncThunk("about/get-about", async(id, thunkAPI) => {
    try {
        await aboutContService.singleabout(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateaboutThunk = createAsyncThunk("about/update-about", async(aboutData, thunkAPI) => {
    try {
        await aboutContService.putabout(aboutData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteaboutThunk = createAsyncThunk("about/delete-about", async(id, thunkAPI) => {
    try {
        await aboutContService.removeabout(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    abouts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const aboutContSlice = createSlice({
    name: "abouts",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createaboutThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createaboutThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneabout = action.payload;
        })
        .addCase(createaboutThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getaboutThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getaboutThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.about = action.payload;
        })
        .addCase(getaboutThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleaboutThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleaboutThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.aboutimg = action.payload.images;
            state.aboutcont = action.payload.content;
        })
        .addCase(getSingleaboutThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateaboutThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateaboutThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedabout = action.payload;
        })
        .addCase(updateaboutThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteaboutThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteaboutThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedabout = action.payload;
        })
        .addCase(deleteaboutThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default aboutContSlice .reducer;