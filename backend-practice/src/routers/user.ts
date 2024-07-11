import {
  getUserById,
  getUserProfile,
  getUsersForAdmin,
  updateUserProfileWithId,
} from "../controllers/user";
import express from "express";

export default (router: express.Router) => {
  router.get("/mypage/personal", getUserById);
  router.get("/admin/users", getUsersForAdmin);
  router.get("/mypage/profile", getUserProfile);
  router.post("/mypage/profile/update", updateUserProfileWithId);
};
