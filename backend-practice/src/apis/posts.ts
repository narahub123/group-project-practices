import { Post } from "../db/post";

export const fetchPosts = async (userId?: string) => {
  let posts;

  if (userId) {
    posts = Post.find({ userId });
  } else {
    posts = Post.find({});
  }

  return posts;
};
