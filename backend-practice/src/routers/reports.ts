import express from "express";

import {
  createReport,
  getAllReportsAdmin,
  getAllReportsById,
  getAllReportsForAdmin,
  updateReport,
} from "../controllers/reports";
import { verifyAccessToken } from "../middlewares/verifyToken";

export default (router: express.Router) => {
  router.post("/reports/add", createReport);
  router.get("/reports/list", getAllReportsById);
  router.get("/reports/admin", getAllReportsForAdmin);
  router.get("/reports/admin/test", verifyAccessToken, getAllReportsAdmin);
  router.post("/reports/update", updateReport);
};
