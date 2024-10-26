import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Review } from "../types";
import axios from "axios";

export type UpdateReviewRequest = {
  bookId: number;
  reviewId: number;
  content: string;
};

export const updateReview = createAsyncThunk<Review, UpdateReviewRequest>(
  "reviews/updateReview",
  async ({ bookId, reviewId, content }: UpdateReviewRequest) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/books/${bookId}/reviews/${reviewId}`,
        { content }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

type AddReviewRequest = {
  id: number;
  name: string;
  content: string;
};

export const addReview = createAsyncThunk<Review, AddReviewRequest>(
  "reviews/addReview",
  async ({ id, name, content }: AddReviewRequest) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/books/${id}/reviews`,
        {
          name,
          content,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(addReview.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(updateReview.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default reviewSlice.reducer;
