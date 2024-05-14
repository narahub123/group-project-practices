import express from "express";

import authenticaction from "./authentication";

const router = express.Router();

export default (): express.Router => {
  authenticaction(router);

  return router;
};
