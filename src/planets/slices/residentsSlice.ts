import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resident } from "../types/resident";

export interface ResidentsState {
  value: Resident[];
}

const initialState: ResidentsState = {
  value: [],
};

export const residentsSlice = createSlice({
  name: "residents",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Resident>) => {
      state.value.push(action.payload);
    },
    set: (state, action: PayloadAction<Resident[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});

export const { add, set } = residentsSlice.actions;

export default residentsSlice.reducer;
