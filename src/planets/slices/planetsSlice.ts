import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Planet } from "../types/planet";

export interface PlanetsState {
  value: Planet[];
}

const initialState: PlanetsState = {
  value: [],
};

export const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Planet>) => {
      state.value.push(action.payload);
    },
    set: (state, action: PayloadAction<Planet[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { add, set } = planetsSlice.actions;

export default planetsSlice.reducer;
