import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileDetails: null, // Stores the profile data
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileDetails: (state, action) => {
      state.profileDetails = action.payload;
    },
    clearProfileDetails: (state) => {
      state.profileDetails = null;
    },
  },
});

export const { setProfileDetails, clearProfileDetails } = profileSlice.actions;
export default profileSlice.reducer;
