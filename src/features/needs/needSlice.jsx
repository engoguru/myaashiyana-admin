import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import needsServices from "../../features/needs/needsService";

// CREATE
export const createneedsThunk = createAsyncThunk(
    "needs/create",
    async (data, thunkAPI) => {
        try {
            return await needsServices.createneeds(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// GET ALL
export const getAllneedsThunk = createAsyncThunk(
    "needs/getAll",
    async (_, thunkAPI) => {
        try {
            return await needsServices.getAllneeds();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// GET SINGLE
export const getSingleneedsThunk = createAsyncThunk(
    "needs/getSingle",
    async (id, thunkAPI) => {
        try {
            return await needsServices.getSingleneeds(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// UPDATE
export const updateneedsThunk = createAsyncThunk(
    "needs/update",
    async ({ id, data }, thunkAPI) => {
        try {
            return await needsServices.updateneeds({ id, data });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// DELETE
export const deleteneedsThunk = createAsyncThunk(
    "needs/delete",
    async (id, thunkAPI) => {
        try {
            return await needsServices.deleteneeds(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    needs: [],
    singleNeeds: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

const needsSlice = createSlice({
    name: "needs",
    initialState,
    reducers: {
        resetneedsState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // CREATE
            .addCase(createneedsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createneedsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.needs.push(action.payload.need || action.payload);
            })
            .addCase(createneedsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // GET ALL
            .addCase(getAllneedsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllneedsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.needs = action.payload.allneeds || action.payload;
            })
            .addCase(getAllneedsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // GET SINGLE
            .addCase(getSingleneedsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleneedsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleNeeds = action.payload.getsingle || action.payload;
            })
            .addCase(getSingleneedsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // UPDATE
            .addCase(updateneedsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateneedsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const updated = action.payload.updateneeds || action.payload;
                state.needs = state.needs.map((st) =>
                    st._id === updated._id ? updated : st
                );
            })
            .addCase(updateneedsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // DELETE
            .addCase(deleteneedsThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteneedsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const id = action.meta.arg;
                state.needs = state.needs.filter((st) => st._id !== id);
            })
            .addCase(deleteneedsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { resetneedsState } = needsSlice.actions;
export default needsSlice.reducer;
