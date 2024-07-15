import {
  addBlockUserByUserId,
  deleteBlockedUser,
  getBlocksForAdmin,
} from "../controllers/blocks";
import express from "express";

export default (router: express.Router) => {
  router.get("/blocks", getBlocksForAdmin);
  router.post("/blockedlist/add", addBlockUserByUserId);
  router.post("/blockedlist/release", deleteBlockedUser);
};
