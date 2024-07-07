import { join } from "../controllers/auth";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/join", join);
};
