import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { MessageStatusProps, NullableProps } from "common/types";
import { authApi, BaseServerError } from "store/services/api/auth";

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
        state.status = "error";
        const payload = action.payload as BaseServerError;
        const { statusCode, messages, error } = payload.data;
        if (authApi.endpoints.me.matchRejected(action)) if (statusCode && action.error) return;
        state.message = messages[0].message || error || (action.error as string);
      });
  },
  selectors: {
    selectStatus: (sliceState) => sliceState,
  },
});

export const { setStatus } = statusSlice.actions;
export const statusSliceReducer = statusSlice.reducer;
export const { selectStatus } = statusSlice.selectors;
