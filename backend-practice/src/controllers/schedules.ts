import express from "express";

import { getUserBySessionToken } from "../db/users";
import {
  getScheduleById,
  getSchedulesById,
  createScheduleByValue,
  deleteScheduleById,
  updateScheduleById,
} from "../apis/schedules";

export const getAllSchedules = async (
  req: express.Request,
  res: express.Response
) => {
  // 관리자 여부 확인

  const schedules = await getSchedulesById().sort("-" + "schedule_time");

  if (!schedules) {
    return res.sendStatus(404);
  }

  return res.status(200).json(schedules);
};

export const getSchedule = async (
  req: express.Request,
  res: express.Response
) => {
  const { schedule_id } = req.params;

  const schedule = await getScheduleById(schedule_id);

  if (!schedule) {
    return res.sendStatus(403);
  }

  return res.status(200).json(schedule);
};

export const createSchedule = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const values = req.body;

    console.log(values);

    if (!values) {
      return res.sendStatus(403);
    }

    const schedule = await createScheduleByValue(values);

    console.log("return", schedule);

    return res.status(201).json(schedule);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const deleteSchedule = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const deletedSchedule = await deleteScheduleById(id);

  return res.json(deletedSchedule);
};

export const updateSchedule = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, values } = req.body;

  const schedule = await updateScheduleById(id, values);

  return res.sendStatus(200).json(schedule);
};
