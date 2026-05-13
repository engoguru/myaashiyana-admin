import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import {toast} from "react-hot-toast";

const getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    user : getUserfromLocalStorage,
    isError : false,
    isLoading : false,
    isSuccess: false,
    message : ""
}

export const createAdmin = createAsyncThunk(
    "auth/signup",  
    async (userData, thunkAPI) => {
    try {
      return await authService.adminSignup(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const createLogin = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
      try {
        return await authService.adminLogin(userData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );


export const ourAllUsers = createAsyncThunk(
  "auth/user",
  async(thunkAPI) => {
    try {
      return await authService.allUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteSingleUser = createAsyncThunk("auth/delete-user", async(id, thunkAPI) => {
  try {
      await authService.deleteUser(id);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
})

export const resetState = createAction("Reset_all");

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (buildeer) => {
      buildeer
        .addCase(createAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createAdmin.fulfilled, (state, action) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.createdUser = action.payload;
          if (state.isSuccess == true) {
            toast.success("Admin Registered Successfully");
          }
        })
        .addCase(createAdmin.rejected, (state, action) => {
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
          state.isLoading = false;
        })
        .addCase(createLogin.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createLogin.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
          })
          .addCase(createLogin.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
          .addCase(ourAllUsers.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(ourAllUsers.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.users = action.payload;
          })
          .addCase(ourAllUsers.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
          .addCase(deleteSingleUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteSingleUser.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedUsers = action.payload;
        })
        .addCase(deleteSingleUser.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
  });
  
  export default authSlice.reducer;
  