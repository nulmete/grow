import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import planetsReducer from "../../planets/slices/planetsSlice";
import residentsReducer from "../../planets/slices/residentsSlice";

export const store = configureStore({
  reducer: {
    planets: planetsReducer,
    residents: residentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
