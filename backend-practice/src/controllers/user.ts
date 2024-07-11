import { getUserByUserId, getUsers } from "../apis/user";
import express from "express";

export const getUserById = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId } = req.user;

  const user = await getUserByUserId(userId);

  console.log(user);

  return res.status(200).json(user);
};

export const getUsersForAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  const users = await getUsers();

  return res.status(200).json(users);
};
