import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
  message: string;
}

const initialState: IAuthState = {
  message: "welcome to champs Redux setup",
};

export const welcomeSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setWelcomeState: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setWelcomeState } = welcomeSlice.actions;
export const welcomeReducer = welcomeSlice.reducer;