import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import upTeamService from "./upTeamService";

export const createUpTeamThunk = createAsyncThunk(
    "upTeam/create", 
    async(upTeamData, thunkAPI) => {
        try {
            await upTeamService.addUpTeam(upTeamData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getUpTeamThunk = createAsyncThunk(
    "upTeam/get-all",
    async (thunkAPI) => {
      try {
        return await upTeamService.allUpTeam();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSinUpTeamThunk = createAsyncThunk("upTeam/get-single", async(id, thunkAPI) => {
    try {
        await upTeamService.singleUpTeam(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateUpTeamThunk = createAsyncThunk("upTeam/update-upTeam", async(upTeamData, thunkAPI) => {
    try {
        await upTeamService.putUpTeam(upTeamData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteUpTeamThunk = createAsyncThunk("upTeam/delete-upTeam", async(id, thunkAPI) => {
    try {
        await upTeamService.deleteUpTeam(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    upTeams: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const upTeamSlice = createSlice({
    name: "upTeams",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createUpTeamThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createUpTeamThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneUpTeam = action.payload;
        })
        .addCase(createUpTeamThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getUpTeamThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUpTeamThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.upTeam = action.payload;
        })
        .addCase(getUpTeamThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSinUpTeamThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSinUpTeamThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.upTmIn = action.payload.icon;
            state.upTmCont = action.payload.content;
        })
        .addCase(getSinUpTeamThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateUpTeamThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUpTeamThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedUpTeam = action.payload;
        })
        .addCase(updateUpTeamThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteUpTeamThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteUpTeamThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedUpTeam = action.payload;
        })
        .addCase(deleteUpTeamThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default upTeamSlice.reducer;