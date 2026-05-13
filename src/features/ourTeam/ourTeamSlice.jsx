import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ourTeamService from "./ourTeamService";

export const createOurTeam = createAsyncThunk(
    "ourTeam/create", 
    async(teamData, thunkAPI) => {
        try {
            await ourTeamService.addMainTeam(teamData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getOurTeam = createAsyncThunk(
    "ourTeam/get-all",
    async (thunkAPI) => {
      try {
        return await ourTeamService.allMainTeam();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const getSinOurTeam = createAsyncThunk("ourTeam/get-single", async(id, thunkAPI) => {
    try {
        await ourTeamService.singleMainTeam(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateOurTeam = createAsyncThunk("ourTeam/update-ourTeam", async(teamData, thunkAPI) => {
    try {
        await ourTeamService.putMainTeam(teamData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteOurTeam = createAsyncThunk("ourTeam/delete-ourTeam", async(id, thunkAPI) => {
    try {
        await ourTeamService.deleteMainTeam(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    ourTeams: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const ourTeamSlice = createSlice({
    name: "ourTeams",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createOurTeam.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createOurTeam.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneOurTeam = action.payload;
        })
        .addCase(createOurTeam.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getOurTeam.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOurTeam.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.ourTeam = action.payload;
        })
        .addCase(getOurTeam.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSinOurTeam.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSinOurTeam.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.otImages = action.payload.images;
            state.otName = action.payload.name;
            state.otPosition = action.payload.position;
        })
        .addCase(getSinOurTeam.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateOurTeam.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateOurTeam.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedOurTeam = action.payload;
        })
        .addCase(updateOurTeam.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteOurTeam.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteOurTeam.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedOurTeam = action.payload;
        })
        .addCase(deleteOurTeam.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default ourTeamSlice.reducer;