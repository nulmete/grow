import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../common/redux/store";
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
    set: (state, action: PayloadAction<Planet[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { set } = planetsSlice.actions;

export const selectPlanets = (state: RootState) => state.planets.value;

export default planetsSlice.reducer;
