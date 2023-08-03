import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {
    data: null,
    isLoading: false,
    errors: "",
  },
  newUserDetails: {
    data: null,
    isLoading: false,
    errors: "",
  }
};

export const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userlogin: (state, action) => {
      state.userDetails.data = action.payload;
    },
    userResistration: (state, action) => {
      state.newUserDetails.data = action.payload;
    },
  },
});

export const { userlogin, userResistration } = UserSlice.actions;

export default UserSlice.reducer;
