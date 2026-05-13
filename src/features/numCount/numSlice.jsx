import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import numService from "./numService";


export const createNumThunk = createAsyncThunk(
    "numCount/create", 
    async(numCntData, thunkAPI) => {
        try {
            await numService.addCount(numCntData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getAllNumThunk = createAsyncThunk(
    "numCount/get-all",
    async (thunkAPI) => {
      try {
        return await numService.allCount();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const getSinNumThunk = createAsyncThunk("numCount/get-single", async(id, thunkAPI) => {
    try {
        await numService.singleCount(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateNumCountThunk = createAsyncThunk("numCount/update-numCount", async(numCntData, thunkAPI) => {
    try {
        await numService.putCount(numCntData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteNumCountThunk = createAsyncThunk("numCount/delete-numCount", async(id, thunkAPI) => {
    try {
        await numService.deleteCount(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    numCounts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const numSlice = createSlice({
    name: "numCounts",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createNumThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createNumThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneNumCnts = action.payload;
        })
        .addCase(createNumThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getAllNumThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllNumThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.numCount = action.payload;
        })
        .addCase(getAllNumThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSinNumThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSinNumThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.ncIcons = action.payload.icons;
            state.ncNum = action.payload.number;
            state.ncCont = action.payload.content;
        })
        .addCase(getSinNumThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateNumCountThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateNumCountThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedNumCnts = action.payload;
        })
        .addCase(updateNumCountThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteNumCountThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteNumCountThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedCnts = action.payload;
        })
        .addCase(deleteNumCountThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default numSlice.reducer;