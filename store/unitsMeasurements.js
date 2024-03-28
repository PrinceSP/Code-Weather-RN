import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temperature: 'metric',
  windSpeed: 'metric',
  pressure: 'metric',
  precipitation: 'metric',
  distance: 'metric',
  timeFormat: 'metric',
};

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    changeUnit: (state, action) => {
      const { type, label } = action.payload;
      state[type] = label;
    },
  },
});

export const { changeUnit } = unitsSlice.actions;

export default unitsSlice.reducer;
