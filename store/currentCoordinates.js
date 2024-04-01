import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lon: "",
  lat: "",
  places: ""
};

const getCurrentCoords = createSlice({
  name: "coords",
  initialState,
  reducers: {
    getCoords: (state, action) => {
      const { lat, lon, places } = action.payload;
      state.lat = lat;
      state.lon = lon;
      state.places = places;
    },
  },
});

export const { getCoords } = getCurrentCoords.actions;

export default getCurrentCoords.reducer;
