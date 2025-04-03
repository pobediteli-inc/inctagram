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
    logOut: create.reducer<void>((state) => {
      state.isLoggedIn = false;
    }),
  }),
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
  },
});

export const { setLoggedIn, logOut } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
export const { selectIsLoggedIn } = authSlice.selectors;
