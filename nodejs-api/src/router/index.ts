import express from "express";

import authenticaction from "./authentication";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  authenticaction(router);
  users(router);

  return router;
};
