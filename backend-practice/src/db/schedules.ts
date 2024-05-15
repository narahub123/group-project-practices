import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  metro_id: { type: Number, required: true },
  user_id: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  schedule_name: { type: String, required: true },
  schedule_detail: [
    {
      schedule_order: { type: Number, required: true },
      start_time: { type: Date, required: true },
      end_time: { type: Date, requierd: true },
      content_id: { type: String, required: true },
      content_type_id: { type: String, required: true },
      createdAt: { type: Date, required: true },
    },
  ],
});

export const ScheduleModel = mongoose.model("Schedule", ScheduleSchema);
