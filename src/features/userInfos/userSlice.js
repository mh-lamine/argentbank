import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "Lamine",
  lastName: "Ngom",
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
