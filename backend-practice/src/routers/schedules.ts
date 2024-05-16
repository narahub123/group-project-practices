import express from "express";

import {
  createSchedule,
  deleteSchedule,
  getAllSchedules,
  getSchedule,
  updateSchedule,
} from "../controllers/schedules";
import { isAuthenticated, isOwner } from "../middlewares/index";

export default (router: express.Router) => {
  router.get("/schedules", isAuthenticated, getAllSchedules);
  router.get("/schedules/:id", isAuthenticated, isOwner, getSchedule);
  router.post("/schedules", isAuthenticated, isOwner, createSchedule);
  router.patch("/schedules/:id", isAuthenticated, isOwner, updateSchedule);
  router.delete("/schedules/:id", isAuthenticated, isOwner, deleteSchedule);
};
