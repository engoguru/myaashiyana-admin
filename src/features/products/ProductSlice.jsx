import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../features/products/Productservices";

// CREATE
export const createProductThunk = createAsyncThunk(
  "product/create",
  async (data, thunkAPI) => {
    try {
      return await productService.createProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET ALL
export const getAllProductsThunk = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// GET SINGLE
export const getSingleProductThunk = createAsyncThunk(
  "product/getSingle",
  async (id, thunkAPI) => {
    try {
      return await productService.getProductById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// UPDATE
export const updateProductThunk = createAsyncThunk(
  "product/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await productService.updateProduct({ id, data });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// DELETE
export const deleteProductThunk = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  products: [],
  singleProduct: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload.product || action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET ALL
      .addCase(getAllProductsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products || action.payload;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET SINGLE
      .addCase(getSingleProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload.product || action.payload;
      })
      .addCase(getSingleProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // UPDATE
      .addCase(updateProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updated = action.payload.updatedProduct || action.payload;
        state.products = state.products.map((p) =>
          p._id === updated._id ? updated : p
        );
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // DELETE
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const id = action.meta.arg;
        state.products = state.products.filter((p) => p._id !== id);
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
