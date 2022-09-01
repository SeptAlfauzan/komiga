import { User } from "@prisma/client";
import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  username: string;
}
const initialState: { value: Admin } = {
  value: { username: "" },
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Admin>) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, reset } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
