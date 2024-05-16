import { ScheduleModel } from "../db/schedules";

// 조건에 맞는 모든 일정 가져오기
export const getSchedulesById = (user_id?: string) =>
  ScheduleModel.find({ _id: user_id });

// 조건에 맞는 일정 가져오기
export const getScheduleById = (schedule_id: string) => {
  return ScheduleModel.findById({ _id: schedule_id });
};

// 일정 만들기
export const createScheduleByValue = (values: Record<string, any>) => {
  new ScheduleModel(values).save().then((schedule) => schedule.toObject());
};

// 일정 삭제하기
export const deleteScheduleById = (schedule_id: string) => {
  ScheduleModel.findOneAndDelete({ _id: schedule_id });
};

// 일정 수정하기
export const updateScheduleById = (
  schedule_id: string,
  values: Record<string, any>
) => {
  ScheduleModel.findOneAndUpdate({ schedule_id, values });
};
