// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import uploadService from "./uploadService";


// export const uploadImg = createAsyncThunk(
//   "upload/images",
//   async (data, thunkAPI) => {
//     try {
//       const formData = new FormData();
//       for (let i = 0; i < data.length; i++) {
//         formData.append("images", data[i]);
//       }
//       return await uploadService.uploadImg(formData);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const delImg = createAsyncThunk("delete/images", async (id, thunkAPI) => {
//   try {
//     return await uploadService.deleteImg(id);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// }
// );

// const initialState = {
//   images: [],
//   isError: false,
//   isLoading: false,
//   isSuccess: false,
//   message: "",
// };
// export const uploadSlice = createSlice({
//   name: "imaegs",
//   initialState,
//   reducers: {
//     resetUploadState: (state) => {
//       state.images = [];
//       state.isError = false;
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.message = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadImg.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(uploadImg.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.images = action.payload;
//       })
//       .addCase(uploadImg.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.error;
//       })
//       .addCase(delImg.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(delImg.fulfilled, (state) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.images = [];
//       })
//       .addCase(delImg.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.payload;
//       });
//   },
// });
// export const { resetUploadState } = uploadSlice.actions;
// export default uploadSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";


export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      // ── File size check (max 5MB per file) ──
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      for (let i = 0; i < data.length; i++) {
        if (data[i].size > MAX_SIZE) {
          return thunkAPI.rejectWithValue(
            `"${data[i].name}" is too large. Maximum allowed size is 5MB.`
          );
        }
      }

      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const delImg = createAsyncThunk("delete/images", async (id, thunkAPI) => {
  try {
    return await uploadService.deleteImg(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}
);

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const uploadSlice = createSlice({
  name: "imaegs",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.images = [];
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Image upload failed. File may be too large.";
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});
export const { resetUploadState } = uploadSlice.actions;
export default uploadSlice.reducer;
