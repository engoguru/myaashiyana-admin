import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import testimonialService from "./testimonialService";

export const createTestimonialThunk = createAsyncThunk(
    "client/create", 
    async(clientData, thunkAPI) => {
        try {
            await testimonialService.addTestimonial(clientData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getTestimonialThunk = createAsyncThunk(
    "client/get-all",
    async (thunkAPI) => {
      try {
        return await testimonialService.getTestimonial();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSingleTestimonialThunk = createAsyncThunk("client/get-client", async(id, thunkAPI) => {
    try {
        await testimonialService.singleTestimonial(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateTestimonialThunk = createAsyncThunk("client/update-client", async(clientData, thunkAPI) => {
    try {
        await testimonialService.putTestimonial(clientData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deleteTestimonialThunk = createAsyncThunk("client/delete-client", async(id, thunkAPI) => {
    try {
        await testimonialService.removeTestimonial(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    testimonials: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const testimonialSlice = createSlice({
    name: "testimonials",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createTestimonialThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createTestimonialThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneTestimonial = action.payload;
        })
        .addCase(createTestimonialThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getTestimonialThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getTestimonialThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.testimonial = action.payload;
        })
        .addCase(getTestimonialThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleTestimonialThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleTestimonialThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.clName = action.payload.name;
            state.clImages = action.payload.images;
            state.clComment = action.payload.comment;
        })
        .addCase(getSingleTestimonialThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateTestimonialThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateTestimonialThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedTestimonial = action.payload;
        })
        .addCase(updateTestimonialThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteTestimonialThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteTestimonialThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deleteTestimonial = action.payload;
        })
        .addCase(deleteTestimonialThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default testimonialSlice.reducer;