import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serSubService from "./serSubService";


export const createSubServiceThunk = createAsyncThunk(
    "subServ/create", 
    async(serSubData, thunkAPI) => {
        try {
            await serSubService.addSubServices(serSubData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getSubServiceThunk = createAsyncThunk(
    "subServ/get-all",
    async (thunkAPI) => {
      try {
        return await serSubService.allSubServices();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSubSingleServThunk = createAsyncThunk("subServ/get-single", async(id, thunkAPI) => {
    try {
        await serSubService.singleSubServices(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateSubServiceThunk = createAsyncThunk("subServ/update-subServ", async(serSubData, thunkAPI) => {
    try {
        await serSubService.putSubServices(serSubData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteSubServiceThunk = createAsyncThunk("subServ/delete-subServ", async(id, thunkAPI) => {
    try {
        await serSubService.deleteSubServices(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    subServs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const serSubSlice = createSlice({
    name: "subServs",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createSubServiceThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createSubServiceThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneSubServ = action.payload;
        })
        .addCase(createSubServiceThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getSubServiceThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSubServiceThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.subServ = action.payload;
        })
        .addCase(getSubServiceThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSubSingleServThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSubSingleServThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.servSubCont = action.payload.content;
        })
        .addCase(getSubSingleServThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateSubServiceThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateSubServiceThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedSubServ = action.payload;
        })
        .addCase(updateSubServiceThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteSubServiceThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteSubServiceThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedSubServ = action.payload;
        })
        .addCase(deleteSubServiceThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default serSubSlice.reducer;