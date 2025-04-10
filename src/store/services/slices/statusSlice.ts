import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { MessageStatusProps, NullableProps } from "common/types";

export type StatusProps = {
  status: NullableProps<MessageStatusProps>;
  message: NullableProps<string>;
};

const initialStatusState: StatusProps = {
  status: null,
  message: null,
};

export const statusSlice = createSlice({
  name: "statusSlice",
  initialState: initialStatusState,
  reducers: (create) => ({
    setStatus: create.reducer<StatusProps>((state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "success";
        state.message = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.status = "failed";
        state.message = action.error?.message || "Unknown error";
      });
  },
  selectors: {
    selectStatus: (sliceState) => sliceState,
  },
});

export const { setStatus } = statusSlice.actions;
export const statusSliceReducer = statusSlice.reducer;
export const { selectStatus } = statusSlice.selectors;
