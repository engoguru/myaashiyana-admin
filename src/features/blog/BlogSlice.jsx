import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Blogservice from "./Blogservice";

export const createBlogThunk = createAsyncThunk(
    "blog/create", 
    async(blogData, thunkAPI) => {
        try {
            return await Blogservice.addBlogs(blogData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getBlogsThunk = createAsyncThunk(
    "blog/get-all",
    async (_, thunkAPI) => {
      try {
        return await Blogservice.allBlogs();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const getSingleBlogThunk = createAsyncThunk("blog/get-single", async(id, thunkAPI) => {
    try {
        return await Blogservice.singleBlogs(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateBlogThunk = createAsyncThunk("blog/update-blog", async(blogData, thunkAPI) => {
    try {
        return await Blogservice.putBlogs(blogData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteBlogThunk = createAsyncThunk("blog/delete-blog", async(id, thunkAPI) => {
    try {
        return await Blogservice.deleteBlogs(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const blogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createBlogThunk.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createBlogThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.createdBlog = action.payload;
        })
        .addCase(createBlogThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getBlogsThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogsThunk.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        })
        .addCase(getBlogsThunk.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleBlogThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleBlogThunk.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.blogImages = action.payload.images;
            state.blogTitle = action.payload.title;
            state.blogExcerpt = action.payload.excerpt;
            state.blogContent = action.payload.content;
            state.blogAuthor = action.payload.author;
            state.blogDate = action.payload.date;
            state.blogQuote = action.payload.quote;
        })
        .addCase(getSingleBlogThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateBlogThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateBlogThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedBlog = action.payload;
        })
        .addCase(updateBlogThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteBlogThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteBlogThunk.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedBlog = action.payload;
        })
        .addCase(deleteBlogThunk.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default blogSlice.reducer;