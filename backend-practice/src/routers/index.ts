import express from "express";

import authenticaction from "./authentication";
import users from "./users";
import schedule from "./schedules";
import places from "./places";
import reports from "./reports";

const router = express.Router();

export default (): express.Router => {
  authenticaction(router);
  users(router);
  schedule(router);
  places(router);
  reports(router);

  return router;
};
