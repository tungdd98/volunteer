import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  transactionApi,
  TransactionDef,
  TransactionRequest,
} from "../transaction";

interface TransactionState {
  transactions: TransactionDef[] | null;
}

const initialState: TransactionState = {
  transactions: null,
};

export const getTransactionListByUid = createAsyncThunk<
  TransactionDef[],
  string
>("transaction/getTransactionListByUid", async uid => {
  const response = await transactionApi.getTransactionListByUidApi(uid);

  return response;
});

export const createTransaction = createAsyncThunk<null, TransactionRequest>(
  "transaction/createTransaction",
  async (data, { rejectWithValue }) => {
    try {
      await transactionApi.createTransactionApi(data);
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTransactionListByUid.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export const transactionReducer = transactionSlice.reducer;
