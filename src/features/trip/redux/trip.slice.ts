import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { tripApi, TripDef } from "../trip";

interface TripState {
  trips: TripDef[] | null;
}

const initialState: TripState = {
  trips: null,
};

export const getTripList = createAsyncThunk<TripDef[]>(
  "trip/getTripList",
  async () => {
    const response = await tripApi.getTripListApi();

    return response;
  }
);

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTripList.fulfilled, (state, action) => {
      state.trips = action.payload;
    });
  },
});

export const tripReducer = tripSlice.reducer;
