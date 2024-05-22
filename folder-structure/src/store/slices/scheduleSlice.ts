import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ScheduleType, ScheduleDetailType } from "../../types/schedules";

const initialState: ScheduleType = {
  schedule_id: undefined,
  metro_id: undefined,
  start_date: undefined,
  end_date: undefined,
  schedule_name: undefined,
  schedule_detail: [],
};

interface MetroType {
  metro_id: string;
}

interface DateType {
  start_date: Date;
  end_date: Date;
}

interface PlaceType {
  content_id: string;
  start_time?: Date;
  end_time?: Date;
  schedule_order?: number;
  createdAt?: Date;
}

export const ScheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addMetroId: {
      reducer: (state, action: PayloadAction<MetroType>) => {
        console.log("metro", state.metro_id);

        state.metro_id = action.payload.metro_id;
      },
      prepare: (metro_id: string) => {
        return { payload: { metro_id } };
      },
    },
    addDates: {
      reducer: (state, action: PayloadAction<DateType>) => {
        console.log(state.metro_id);
        console.log(action.payload.start_date);
        console.log(action.payload.end_date);

        state.start_date = action.payload.start_date;
        state.end_date = action.payload.end_date;
      },
      prepare: (start_date: Date, end_date: Date) => {
        return {
          payload: {
            start_date,
            end_date,
          },
        };
      },
    },
    addPlace: {
      reducer: (state, action: PayloadAction<ScheduleDetailType>) => {
        console.log(state.metro_id);
        console.log(state.start_date);
        console.log(state.end_date);
        console.log(state.schedule_detail);

        console.log(action.payload);
      },
      prepare: (schedule_detail: ScheduleDetailType) => {
        return {
          payload: schedule_detail,
        };
      },
    },
  },
});

export default ScheduleSlice.reducer;

export const { addMetroId, addDates, addPlace } = ScheduleSlice.actions;
