import { addBlockUserByUserId, getBlocksForAdmin } from "../controllers/blocks";
import express from "express";

export default (router: express.Router) => {
  router.get("/admin/blocks", getBlocksForAdmin);
  router.post("/blockedlist/add", addBlockUserByUserId);
};
