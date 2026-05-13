import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mapService from "./mapService";

export const createdMapThunk = createAsyncThunk(
    "map/create", 
    async(mapData, thunkAPI) => {
        try {
            await mapService.addMap(mapData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getMapThunk = createAsyncThunk(
    "map/get-all",
    async (thunkAPI) => {
      try {
        return await mapService.allMap();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const getSingleMapThunk = createAsyncThunk("map/get-single", async(id, thunkAPI) => {
    try {
        await mapService.singleMap(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateMapThunk = createAsyncThunk("map/update-map", async(mapData, thunkAPI) => {
    try {
        await mapService.putMap(mapData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deletedMapThunk = createAsyncThunk("map/delete-map", async(id, thunkAPI) => {
    try {
        await mapService.deleteMap(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    mapLinks: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const mapSlice = createSlice({
    name: "mapLinks",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createdMapThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createdMapThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneLink = action.payload;
        })
        .addCase(createdMapThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getMapThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMapThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.map = action.payload;
        })
        .addCase(getMapThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleMapThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleMapThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.mpLink = action.payload.link;
        })
        .addCase(getSingleMapThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateMapThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateMapThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedLink = action.payload;
        })
        .addCase(updateMapThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deletedMapThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletedMapThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedLink = action.payload;
        })
        .addCase(deletedMapThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default mapSlice.reducer;