import { fetchPostsForAdmin } from "../controllers/posts";
import express from "express";

export default (router: express.Router) => {
  router.get("/admin/posts", fetchPostsForAdmin);
};
