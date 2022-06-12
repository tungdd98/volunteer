import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { tripApi, TripDef } from "../trip";

interface TripState {
  trips: TripDef[] | null;
  tripDetail: TripDef | null;
}

const initialState: TripState = {
  trips: null,
  tripDetail: null,
};

export const getTripList = createAsyncThunk<TripDef[]>(
  "trip/getTripList",
  async () => {
    const response = await tripApi.getTripListApi();

    return response;
  }
);

export const getTripDetail = createAsyncThunk<TripDef | null, string>(
  "trip/getTripDetail",
  async tripId => {
    const response = await tripApi.getTripDetailApi(tripId);

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
    builder.addCase(getTripDetail.fulfilled, (state, action) => {
      state.tripDetail = action.payload;
    });
  },
});

export const tripReducer = tripSlice.reducer;
