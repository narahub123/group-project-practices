import { getUserById, getUsersForAdmin } from "../controllers/user";
import express from "express";

export default (router: express.Router) => {
  router.get("/mypage/personal", getUserById);
  router.get("/admin/users", getUsersForAdmin);
};
