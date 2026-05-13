import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import wishlistService from "../../features/wishlist/wishlistService";

// CREATE
export const createWishlistThunk = createAsyncThunk(
  "wishlist/create",
  async (data, thunkAPI) => {
    try {
      return await wishlistService.createWishlistItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET ALL
export const getAllWishlistThunk = createAsyncThunk(
  "wishlist/getAll",
  async (_, thunkAPI) => {
    try {
      return await wishlistService.getAllWishlistItems();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET SINGLE
export const getSingleWishlistThunk = createAsyncThunk(
  "wishlist/getSingle",
  async (id, thunkAPI) => {
    try {
      return await wishlistService.getSingleWishlistItem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// UPDATE
export const updateWishlistThunk = createAsyncThunk(
  "wishlist/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await wishlistService.updateWishlistItem({ id, data });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// DELETE
export const deleteWishlistThunk = createAsyncThunk(
  "wishlist/delete",
  async (id, thunkAPI) => {
    try {
      return await wishlistService.deleteWishlistItem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  items: [],
  singleItem: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWishlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWishlistThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.push(action.payload.item || action.payload);
      })
      .addCase(createWishlistThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAllWishlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWishlistThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload.items || action.payload;
      })
      .addCase(getAllWishlistThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getSingleWishlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleWishlistThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleItem = action.payload.item || action.payload;
      })
      .addCase(getSingleWishlistThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateWishlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWishlistThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updated = action.payload.updated || action.payload;
        state.items = state.items.map((it) =>
          it._id === updated._id ? updated : it
        );
      })
      .addCase(updateWishlistThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteWishlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWishlistThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const id = action.meta.arg;
        state.items = state.items.filter((it) => it._id !== id);
      })
      .addCase(deleteWishlistThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;
