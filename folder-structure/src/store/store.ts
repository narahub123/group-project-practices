import { configureStore } from "@reduxjs/toolkit";
import ScheduleSlice from "./slices/scheduleSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    schedule: ScheduleSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: false,
    }),
});

export const useScheduleDispatch: () => typeof store.dispatch = useDispatch;
export const useScheduleSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
