import express from "express";

import { createReport, getAllReportsById } from "../controllers/reports";

export default (router: express.Router) => {
  router.post("/reports/add", createReport);
  router.get("/reports/list", getAllReportsById);
};
