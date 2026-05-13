import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rescueStoryService from "../../features/rescuestory/rescuestoryservice";

// CREATE
export const createRescueStoryThunk = createAsyncThunk(
  "rescueStory/create",
  async (data, thunkAPI) => {
    try {
      return await rescueStoryService.createRescueStory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET ALL
export const getAllRescueStoriesThunk = createAsyncThunk(
  "rescueStory/getAll",
  async (_, thunkAPI) => {
    try {
      return await rescueStoryService.getAllRescueStories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET SINGLE
export const getSingleRescueStoryThunk = createAsyncThunk(
  "rescueStory/getSingle",
  async (id, thunkAPI) => {
    try {
      return await rescueStoryService.getSingleRescueStory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// UPDATE
export const updateRescueStoryThunk = createAsyncThunk(
  "rescueStory/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await rescueStoryService.updateRescueStory({ id, data });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// DELETE
export const deleteRescueStoryThunk = createAsyncThunk(
  "rescueStory/delete",
  async (id, thunkAPI) => {
    try {
      return await rescueStoryService.deleteRescueStory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  stories: [],
  singleStory: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const rescueStorySlice = createSlice({
  name: "rescueStory",
  initialState,
  reducers: {
    resetRescueStoryState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createRescueStoryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRescueStoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stories.push(action.payload.story || action.payload);
      })
      .addCase(createRescueStoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET ALL
      .addCase(getAllRescueStoriesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRescueStoriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // If backend returns { success, stories }
        state.stories = action.payload.stories || action.payload;
      })
      .addCase(getAllRescueStoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET SINGLE
      .addCase(getSingleRescueStoryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRescueStoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleStory = action.payload.story || action.payload;
      })
      .addCase(getSingleRescueStoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // UPDATE
      .addCase(updateRescueStoryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRescueStoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the story in the array
        const updated = action.payload.updated || action.payload;
        state.stories = state.stories.map((st) =>
          st._id === updated._id ? updated : st
        );
      })
      .addCase(updateRescueStoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // DELETE
      .addCase(deleteRescueStoryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRescueStoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Remove deleted story from array
        const id = action.meta.arg;
        state.stories = state.stories.filter((st) => st._id !== id);
      })
      .addCase(deleteRescueStoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetRescueStoryState } = rescueStorySlice.actions;
export default rescueStorySlice.reducer;
