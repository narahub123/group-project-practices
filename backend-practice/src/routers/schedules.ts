import express from "express";

import { getAllSchedulesById } from "../controllers/schedules";
import { isAuthenticated, isOwner } from "../middlewares/index";

export default (router: express.Router) => {
  router.get("/schedules", isAuthenticated, isOwner, getAllSchedulesById);
};
