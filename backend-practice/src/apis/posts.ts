import { Post } from "../db/post";

export const fetchPosts = async () => {
  const posts = Post.find({});

  return posts;
};
