import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import programmeService from "./programmeService";

export const createProgThunk = createAsyncThunk(
    "program/create", 
    async(progData, thunkAPI) => {
        try {
            await programmeService.addProgrammes(progData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getProgThunk = createAsyncThunk(
    "program/get-all",
    async (thunkAPI) => {
      try {
        return await programmeService.allProgrammes();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSingleProgThunk = createAsyncThunk("program/get-single", async(id, thunkAPI) => {
    try {
        await programmeService.singleProgrammes(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateProgThunk = createAsyncThunk("program/update-program", async(progData, thunkAPI) => {
    try {
        await programmeService.putProgrammes(progData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteProgThunk = createAsyncThunk("program/delete-program", async(id, thunkAPI) => {
    try {
        await programmeService.deleteProgrammes(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    programmes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const programmeSlice = createSlice({
    name: "programmes",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createProgThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createProgThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneProgramme = action.payload;
        })
        .addCase(createProgThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getProgThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProgThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.programme = action.payload;
        })
        .addCase(getProgThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleProgThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleProgThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.proImages = action.payload.images;
            state.progHeading = action.payload.heading;
            state.progCont = action.payload.content;
        })
        .addCase(getSingleProgThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateProgThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProgThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedProgramme = action.payload;
        })
        .addCase(updateProgThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteProgThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteProgThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedProgramme = action.payload;
        })
        .addCase(deleteProgThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default programmeSlice.reducer;