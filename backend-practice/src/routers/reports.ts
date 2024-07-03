import express from "express";

import {
  createReport,
  getAllReportsById,
  getAllReportsForAdmin,
  updateReport,
} from "../controllers/reports";

export default (router: express.Router) => {
  router.post("/reports/add", createReport);
  router.get("/reports/list", getAllReportsById);
  router.get("/reports/admin", getAllReportsForAdmin);
  router.post("/reports/update", updateReport);
};
