import {
  getUserById,
  getUserProfile,
  getUsersForAdmin,
  updateUserProfileWithId,
  updateUserById,
} from "../controllers/user";
import express from "express";

export default (router: express.Router) => {
  router.get("/admin/users", getUsersForAdmin);
  router.get("/mypage/profile", getUserProfile);
  router.post("/mypage/profile/update", updateUserProfileWithId);
  router.get("/mypage/personal", getUserById);
  router.post("/mypage/personal/update", updateUserById);
};
