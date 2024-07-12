import { verfiyRole } from "../helpers/verifyRole";
import { fetchPosts } from "../apis/posts";
import express from "express";

export const fetchAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  const { role, userId } = req.user;

  let posts;

  // 관리자 여부 확인
  if (verfiyRole(role)) {
    posts = await fetchPosts();
  } else {
    posts = await fetchPosts(userId);
  }

  console.log("posts", posts);

  return res.status(200).json(posts);
};
