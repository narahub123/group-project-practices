import express from "express";

import authenticaction from "./authentication";
import users from "./users";
import schedule from "./schedule";

const router = express.Router();

export default (): express.Router => {
  authenticaction(router);
  users(router);
  schedule(router);

  return router;
};
