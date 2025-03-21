import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { MessageStatus, NullableProps } from "common/types";

export type StatusProps = {
  status: NullableProps<MessageStatus>;
  error: NullableProps<string>;
};

const initialStatusState: StatusProps = {
  status: null,
  error: null,
};

export const statusSlice = createSlice({
  name: "statusSlice",
  initialState: initialStatusState,
  reducers: (create) => ({
    setStatus: create.reducer<StatusProps>((state, action) => {
      state.status = action.payload.status;
    }),
    setError: create.reducer<StatusProps>((state, action) => {
      state.error = action.payload.error;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Unknown error";
      });
  },
  selectors: {
    selectStatus: (sliceState) => sliceState.status,
    selectError: (sliceState) => sliceState.error,
  },
});

export const { setStatus, setError } = statusSlice.actions;
export const statusSliceReducer = statusSlice.reducer;
export const { selectStatus, selectError } = statusSlice.selectors;
