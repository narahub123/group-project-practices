import { verfiyRole } from "../helpers/verifyRole";
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
  const { role, userId } = req.user;

  let users;
  // 관리자 여부 확인
  if (verfiyRole(role)) {
    users = await getUsers();
  } else {
    users = await getUsers(userId);
  }

  console.log(users);

  return res.status(200).json(users);
};
