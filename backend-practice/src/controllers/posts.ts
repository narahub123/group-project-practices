import { fetchPosts } from "../apis/posts";
import express from "express";

export const fetchPostsForAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  // 관리자 여부 확인

  const posts = await fetchPosts();

  console.log("posts", posts);

  return res.status(200).json(posts);
};
