import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import emailService from "./emailService";

export const createdEmail = createAsyncThunk(
    "emails/create", 
    async(emailsData, thunkAPI) => {
        try {
            await emailService.addEmails(emailsData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
});

export const getEmail = createAsyncThunk(
    "emails/get-all",
    async (thunkAPI) => {
      try {
        return await emailService.allEmails();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getSingleEmail = createAsyncThunk("emails/get-single", async(id, thunkAPI) => {
    try {
        await emailService.singleEmails(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateEmail = createAsyncThunk("emails/update-emails", async(emailsData, thunkAPI) => {
    try {
        await emailService.putEmails(emailsData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


export const deletedEmails = createAsyncThunk("emails/delete-emails", async(id, thunkAPI) => {
    try {
        await emailService.deleteEmails(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    emails: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const emailSlice = createSlice({
    name: "emails",
    initialState: initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createdEmail.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createdEmail.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.doneEmail = action.payload;
        })
        .addCase(createdEmail.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getEmail.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getEmail.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.email = action.payload;
        })
        .addCase(getEmail.rejected,(state, action) => {
            state.message = action.error;
            state.isError = true;
        })
        .addCase(getSingleEmail.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSingleEmail.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.elTitle = action.payload.title;
        })
        .addCase(getSingleEmail.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateEmail.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateEmail.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.updatedEmail = action.payload;
        })
        .addCase(updateEmail.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deletedEmails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletedEmails.fulfilled, (state,action) => {
            state.isSuccess = true;
            state.deletedEmail = action.payload;
        })
        .addCase(deletedEmails.rejected, (state, action) => {
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    }
})

export default emailSlice.reducer;