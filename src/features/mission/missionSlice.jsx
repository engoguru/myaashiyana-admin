
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import missionService from "./missionService";

export const createdMissionThunk = createAsyncThunk(
    "mission/create", 
    async(misData, thunkAPI) => {
        try {
            await missionService.addMission(misData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getMissionThunk = createAsyncThunk(
    "mission/get-all",
    async (thunkAPI) => {
      try {
        return await missionService.allMission();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const getSingleMissionThunk = createAsyncThunk("mission/get-single", async(id, thunkAPI) => {
    try {
        await missionService.singleMission(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateMissionThunk = createAsyncThunk("mission/update-mission", async(misData, thunkAPI) => {
    try {
        await missionService.putMission(misData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deletedMissionThunk = createAsyncThunk("mission/delete-mission", async(id, thunkAPI) => {
    try {
        await missionService.deleteMission(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    missions: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const missionSlice = createSlice({
    name: "missions",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createdMissionThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createdMissionThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneMission = action.payload;
        })
        .addCase(createdMissionThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getMissionThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMissionThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.mission = action.payload;
        })
        .addCase(getMissionThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleMissionThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleMissionThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.misImg = action.payload.images;
            state.misCont = action.payload.content;
        })
        .addCase(getSingleMissionThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateMissionThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateMissionThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedMission = action.payload;
        })
        .addCase(updateMissionThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deletedMissionThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletedMissionThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedMission = action.payload;
        })
        .addCase(deletedMissionThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default missionSlice.reducer;