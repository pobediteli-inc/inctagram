import { createSlice } from "@reduxjs/toolkit";
import { NullableProps } from "common/types";

export type StateProps = {
  isLoggedIn: NullableProps<boolean>;
};

const initialAuthState: StateProps = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: (create) => ({
    setLoggedIn: create.reducer<StateProps>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
  }),
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
  },
});

export const { setLoggedIn } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
export const { selectIsLoggedIn } = authSlice.selectors;
