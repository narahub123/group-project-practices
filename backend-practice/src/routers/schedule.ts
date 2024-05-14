import express from "express";

import { getAllSchedulesById } from "../controllers/schedule";
import { isAuthenticated, isOwner } from "../middlewares/index";

export default (router: express.Router) => {
  router.get("/schedules", isAuthenticated, isOwner, getAllSchedulesById);
};
