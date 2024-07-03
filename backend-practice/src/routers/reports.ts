import express from "express";

import { createReport } from "../controllers/reports";

export default (router: express.Router) => {
  router.post("/reports/add", createReport);
};
