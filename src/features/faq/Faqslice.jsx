import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import faqService from "./Faqservices";

// Async thunks
export const createFaq = createAsyncThunk("faq/create", async (faqData, thunkAPI) => {
  try {
    const response = await faqService.addFaq(faqData);
    console.log("Create FAQ Response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Create FAQ Error:", error.message); // Log the error
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getFaqs = createAsyncThunk("faq/get-all", async (_, thunkAPI) => {
  try {
    const response = await faqService.allFaqs();
    console.log("Get FAQs Response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Get FAQs Error:", error.message); // Log the error
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getSingleFaq = createAsyncThunk("faq/get-single", async (id, thunkAPI) => {
  try {
    const response = await faqService.singleFaq(id);
    console.log("Get Single FAQ Response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Get Single FAQ Error:", error.message); // Log the error
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateFaq = createAsyncThunk("faq/update", async (faqData, thunkAPI) => {
  try {
    const response = await faqService.updateFaq(faqData);
    console.log("Update FAQ Response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Update FAQ Error:", error.message); // Log the error
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteFaq = createAsyncThunk("faq/delete", async (id, thunkAPI) => {
  try {
    const response = await faqService.deleteFaq(id);
    console.log("Delete FAQ Response:", response); // Log the response
    return response;
  } catch (error) {
    console.error("Delete FAQ Error:", error.message); // Log the error
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const resetState = createAction("faq/reset-state");

const initialState = {
  faqs: [],
  elQuestion: "",
  elAnswer: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFaq.pending, (state) => {
        state.isLoading = true;
        console.log("Create FAQ Pending...");
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.doneFaq = action.payload;
        console.log("Create FAQ Fulfilled:", action.payload);
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.error("Create FAQ Rejected:", action.payload); 
      })

      .addCase(getFaqs.pending, (state) => {
        state.isLoading = true;
        console.log("Get FAQs Pending...");
      })
      .addCase(getFaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.faqs = action.payload;
        console.log("Get FAQs Fulfilled:", action.payload); 
      })
      .addCase(getFaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.error("Get FAQs Rejected:", action.payload); 
      })

      .addCase(getSingleFaq.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.elQuestion = action.payload.question;
        state.elAnswer = action.payload.answer;
        console.log("Get Single FAQ Fulfilled:", action.payload);
      })
      .addCase(getSingleFaq.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        console.error("Get Single FAQ Rejected:", action.payload); 
      })

      .addCase(updateFaq.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.updatedFaq = action.payload;
        console.log("Update FAQ Fulfilled:", action.payload);
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        console.error("Update FAQ Rejected:", action.payload);
      })

      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.deletedFaq = action.payload;
        console.log("Delete FAQ Fulfilled:", action.payload);
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        console.error("Delete FAQ Rejected:", action.payload); 
      })

      .addCase(resetState, () => initialState);
  },
});

export default faqSlice.reducer;
