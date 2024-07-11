import { verfiyRole } from "../helpers/verifyRole";
import { getUserByUserId, getUsers, updateUserProfile } from "../apis/user";
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

// 프로필 정보
export const getUserProfile = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId } = req.user;

  const user = await getUserByUserId(userId);

  const { gender, userpic, intro, nickname } = user;

  const userProfile = {
    gender,
    userpic,
    intro,
    nickname,
  };

  return res.status(200).json(userProfile);
};

// 프로필 업데이트
export const updateUserProfileWithId = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId } = req.user;

  const { userpic, intro, nickname } = req.body;

  const value = {
    userpic,
    intro,
    nickname,
  };

  const newUserProfile = await updateUserProfile(userId, value);

  return res.status(201).json(newUserProfile);
};
