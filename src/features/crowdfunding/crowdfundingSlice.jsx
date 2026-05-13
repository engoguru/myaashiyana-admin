import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import crowdfundingService from "./crowdfundingService";

// Thunks using correct crowdfundingService methods
export const createcrowdfundingThunk = createAsyncThunk(
    "crowdfunding/create",
    async (progData, thunkAPI) => {
        try {
            return await crowdfundingService.addcrowdFunding(progData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getcrowdfundingThunk = createAsyncThunk(
    "crowdfunding/get-all",
    async (_, thunkAPI) => {
        try {
            return await crowdfundingService.getallcrowdFunding();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getSinglecrowdfundingThunk = createAsyncThunk(
    "crowdfunding/get-single",
    async (id, thunkAPI) => {
        try {
            return await crowdfundingService.singlecrowdFunding(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deletecrowdfundingThunk = createAsyncThunk(
    "crowdfunding/delete",
    async (id, thunkAPI) => {
        try {
            return await crowdfundingService.deletecrowdFunding(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const resetState = createAction("crowdfunding/reset_all");

const initialState = {
    crowdfunding: [],
    singleCrowdfunding: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const crowdfundingSlice = createSlice({
    name: "crowdfunding",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createcrowdfundingThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createcrowdfundingThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.crowdfunding.push(action.payload);
                state.message = "Crowdfunding created successfully!";
            })
            .addCase(createcrowdfundingThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to create crowdfunding";
            })
            // Get All
            .addCase(getcrowdfundingThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getcrowdfundingThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.crowdfunding = action.payload;
            })
            .addCase(getcrowdfundingThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch crowdfunding";
            })
            // Get Single
            .addCase(getSinglecrowdfundingThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSinglecrowdfundingThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.singleCrowdfunding = action.payload;
            })
            .addCase(getSinglecrowdfundingThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch crowdfunding";
            })
            // Delete
            .addCase(deletecrowdfundingThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletecrowdfundingThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.crowdfunding = state.crowdfunding.filter(
                    (item) => item._id !== action.payload._id
                );
                state.message = "Crowdfunding deleted successfully!";
            })
            .addCase(deletecrowdfundingThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to delete crowdfunding";
            })
            // Reset
            .addCase(resetState, () => initialState);
    }
});

export default crowdfundingSlice.reducer;