import express from "express";

import { ScheduleModel as Schedule } from "../db/schedule";
import users from "routers/users";
import { getUserBySessionToken } from "../db/users";

export const getAllSchedulesById = async (
  req: express.Request,
  res: express.Response
) => {
  const sessionToken = req.cookies["ANTONIO-AUTH"];
  if (!sessionToken) {
    return res.sendStatus(403);
  }

  console.log(sessionToken);

  const existingUser = await getUserBySessionToken(sessionToken);

  const id = existingUser._id.toString();

  const schedules = await Schedule.findById(id);

  if (!schedules) {
    return res.sendStatus(404);
  }

  return res.status(200).json(schedules);
};

export const getSchedules = async (
  req: express.Request,
  res: express.Response
) => {};

export const createSchedules = async (
  req: express.Request,
  res: express.Response
) => {};

export const deleteSchedules = async (
  req: express.Request,
  res: express.Response
) => {};

export const updateSchedules = async (
  req: express.Request,
  res: express.Response
) => {};
